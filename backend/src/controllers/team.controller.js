import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Team from "../models/team.model.js";
import User from "../models/user.model.js";

const createTeam = AsyncHandler(async (req, res) => {
  const {
    userId,
    teamName,
    hackathonName,
    description,
    teamSize,
    location,
    lookingFor,
    startDate,
    endDate,
    skills,
  } = req.body;

  if (
    !userId ||
    !teamName ||
    !hackathonName ||
    !description ||
    !teamSize ||
    !lookingFor ||
    !startDate ||
    !endDate ||
    !skills
  ) {
    throw new ApiError(400, "enter all feilds");
  }

  const lookingForArr = lookingFor.split(", ");
  const teamMembers = [userId];
  const dates = {
    startDate,
    endDate,
  };

  const team = await Team.create({
    teamName,
    hackathonName,
    description,
    teamSize,
    location,
    lookingFor: lookingForArr,
    dates,
    skills,
    teamLeader: userId,
    teamMembers,
  });

  if (!team) throw new ApiError(400, "error creating team");

  res.status(201).json(new ApiResponse(201, team, "team created successfully"));
});

const getTeams = AsyncHandler(async(req,res) => {
    const teams = await Team.find().populate("teamMembers","profileImage");

    res.status(201).json(new ApiResponse(201,teams,"fetched all teams"));
})

const getTeam = AsyncHandler(async(req,res) => {
    const {teamId} = req.params;

    if(!teamId) throw new ApiError(400,"missing fields");

    const team = await Team.findById
    (teamId).populate("teamMembers","profileImage name email");

    if(!team) throw new ApiError(404,"team not found");

    res.status(201).json(new ApiResponse(200,team,"fetched team successfully"));
})

const joinTeam = AsyncHandler(async(req,res) => {
    const {userId,teamId,message} = req.body;

    if(!userId || !teamId) throw new ApiError(400,"missing fields");

    const team = await Team.findById(teamId);
    const user = await User.findById(userId);

    if(!team || !user) throw new ApiError(404,"team or user not found");

    team.joinRequests.push({userId,message});
    user.myRequests.push({teamId,status:"Pending"});

    await user.save();
    await team.save();

    res.status(201).json(new ApiResponse(200,team,"request sent successfully"));
})

const getTeamRequests = AsyncHandler(async(req,res) => {
    const {teamId} = req.params;

    if(!teamId) throw new ApiError(400,"missing fields");

    const team = await Team.findById(teamId).populate("joinRequests.userId","profileImage name email");

    if(!team) throw new ApiError(404,"team not found");

    res.status(201).json(new ApiResponse(200,team.joinRequests,"fetched all requests"));
  }
)

export {createTeam,getTeams,getTeam,joinTeam,getTeamRequests};