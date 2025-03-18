import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Team from "../models/team.model.js";
import User from "../models/user.model.js";
import { sendAcceptMessage } from "../utils/sendmail.js";

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

    const team = await Team.findById(teamId)
    .populate("joinRequests.userId","profileImage name email")
    .populate("teamMembers","profileImage name email");

    if(!team) throw new ApiError(404,"team not found");

    res.status(201).json(new ApiResponse(200,team,"fetched team successfully"));
})

const joinTeam = AsyncHandler(async(req,res) => {
    const {userId,teamId,message} = req.body;

    if(!userId || !teamId) throw new ApiError(400,"missing fields");

    const team = await Team.findById(teamId);
    const user = await User.findById(userId);

    if(!team || !user) throw new ApiError(404,"team or user not found");

    if(team.teamMembers.includes(userId)) {
        throw new ApiError(400,"user already in team");
    }
    if(team.joinRequests.find(request => request.userId === userId)) {
        throw new ApiError(400,"request already sent");
    }

    team.joinRequests.push({userId,message});
    user.myRequests.push({teamId,status:"Pending"});

    await user.save();
    await team.save();

    res.status(201).json(new ApiResponse(200,team,"request sent successfully"));
})

const acceptRequest = AsyncHandler(async(req,res) => {
    const {teamId,userId} = req.body;

    if(!teamId || !userId) throw new ApiError(400,"missing fields");

    const team = await Team.findById(teamId);
    const user = await User.findById(userId);

    if(!team || !user) throw new ApiError(404,"team or user not found");

    const newRequests = team.joinRequests.filter(request => request.userId != userId);
    team.teamMembers.push(userId);

    team.joinRequests = newRequests;

    user.myRequests = user.myRequests.map(request => {
      if (request.teamId.toString() === teamId.toString()) {
          return { ...request, status: "Accepted" };
      }
      return request;
    });

    await user.save();
    await team.save();

    sendAcceptMessage(user.email, user.name, team.teamName);
    
    res.status(201).json(new ApiResponse(200,team,"request accepted successfully"));
});

const rejectRequest = AsyncHandler(async(req,res) => {
    const {teamId,userId} = req.body;

    if(!teamId || !userId) throw new ApiError(400,"missing fields");

    const team = await Team.findById(teamId);
    const user = await User.findById(userId);

    if(!team || !user) throw new ApiError(404,"team or user not found");

    const newRequests = team.joinRequests.filter(request => request.userId != userId);

    team.joinRequests = newRequests;

    user.myRequests = user.myRequests.map(request => {
      if (request.teamId.toString() === teamId.toString()) {
          return { ...request, status: "Rejected" };
      }
      return request;
    });

    await user.save();
    await team.save();

    res.status(201).json(new ApiResponse(200,team,"request rejected successfully"));
});


// const getTeamRequests = AsyncHandler(async(req,res) => {
//     const {teamId} = req.params;

//     if(!teamId) throw new ApiError(400,"missing fields");

//     const team = await Team.populate(team, {
//       path: 'joinRequests.userId',
//       select: 'profileImage name email'
//     });

//     if(!team) throw new ApiError(404,"team not found");

//     res.status(201).json(new ApiResponse(200,team,"fetched all requests"));
//   }
// )

export {createTeam,getTeams,getTeam,joinTeam, acceptRequest, rejectRequest};