import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Team from "../models/team.model.js";
import User from "../models/user.model.js";
import {
  sendAcceptMessage,
  sendRejectMessage,
  sendJoinRequest,
} from "../utils/sendmail.js";
import { getIO } from "../socket/socket.js";
import Message from "../models/message.model.js";

const createLiveTeam = AsyncHandler(async (req, res) => {
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
    !startDate ||
    !endDate
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
    isLive: true,
  });

  if (!team) throw new ApiError(400, "error creating team");

  res.status(201).json(new ApiResponse(201, team, "team created successfully"));
});

const getTeams = AsyncHandler(async (req, res) => {
  const teams = await Team.find()
    .populate("teamMembers", " username profileImage")
    .populate("joinRequests.userId", "username profileImage name email");
  res.status(201).json(new ApiResponse(201, teams, "fetched all teams"));
});

const getTeam = AsyncHandler(async (req, res) => {
  const { teamId } = req.params;

  if (!teamId) throw new ApiError(400, "missing fields");

  const team = await Team.findById(teamId)
    .populate("joinRequests.userId", "profileImage name email")
    .populate("teamMembers", "profileImage name email");

  if (!team) throw new ApiError(404, "team not found");

  res.status(201).json(new ApiResponse(200, team, "fetched team successfully"));
});

const joinTeam = AsyncHandler(async (req, res) => {
  const { userId, teamId, message } = req.body;

  if (!userId || !teamId) throw new ApiError(400, "missing fields");

  const team = await Team.findById(teamId).populate("teamLeader", "name email");
  const user = await User.findById(userId);

  if (!team || !user) throw new ApiError(404, "team or user not found");

  if (team.teamMembers.includes(userId)) {
    throw new ApiError(400, "user already in team");
  }
  if (team.joinRequests.find((request) => request.userId === userId)) {
    throw new ApiError(400, "request already sent");
  }

  team.joinRequests.push({ userId, message });
  user.myRequests.push({ teamId, status: "Pending" });

  await user.save();
  await team.save();

  sendJoinRequest(
    team.teamLeader.email,
    team.teamLeader.name,
    user.name,
    team.teamName
  );

  res.status(201).json(new ApiResponse(200, team, "request sent successfully"));
});

const acceptRequest = AsyncHandler(async (req, res) => {
  const { teamId, userId } = req.body;

  if (!teamId || !userId) throw new ApiError(400, "missing fields");

  const team = await Team.findById(teamId).populate(
    "joinRequests.userId",
    "username name email"
  );
  const user = await User.findById(userId);

  if (!team || !user) throw new ApiError(404, "team or user not found");

  // Find the request before removing it
  const acceptedRequest = team.joinRequests.find(
    (req) => req.userId._id.toString() === userId.toString()
  );

  const newRequests = team.joinRequests.filter(
    (request) => request.userId._id.toString() != userId.toString()
  );
  team.teamMembers.push(userId);

  team.joinRequests = newRequests;

  user.myRequests = user.myRequests.map((request) => {
    if (request.teamId.toString() === teamId.toString()) {
      return { ...request, status: "Accepted" };
    }
    return request;
  });

  await user.save();
  await team.save();

  sendAcceptMessage(user.email, user.name, team.teamName);

  // Get the IO instance
  const io = getIO();

  // Send notification to the team chat
  if (io && acceptedRequest?.userId?.username) {
    const notificationMessage = new Message({
      teamId,
      senderName: "System",
      content: `${acceptedRequest.userId.username} has joined the team`,
      type: "notification",
    });

    const savedMessage = await notificationMessage.save();
    io.to(teamId).emit("new_message", savedMessage);
  }

  res.status(201).json(
    new ApiResponse(
      200,
      {
        team,
        joinedUserName: acceptedRequest?.userId?.username || user.username,
      },
      "request accepted successfully"
    )
  );
});

const rejectRequest = AsyncHandler(async (req, res) => {
  const { teamId, userId } = req.body;

  if (!teamId || !userId) throw new ApiError(400, "missing fields");

  const team = await Team.findById(teamId);
  const user = await User.findById(userId);

  if (!team || !user) throw new ApiError(404, "team or user not found");

  const newRequests = team.joinRequests.filter(
    (request) => request.userId.toString() != userId.toString()
  );

  team.joinRequests = newRequests;

  user.myRequests = user.myRequests.map((request) => {
    if (request.teamId.toString() === teamId.toString()) {
      return { ...request, status: "Rejected" };
    }
    return request;
  });

  await user.save();
  await team.save();

  sendRejectMessage(user.email, user.name, user.teamName);

  res
    .status(201)
    .json(new ApiResponse(200, team, "request rejected successfully"));
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

export {
  createLiveTeam,
  getTeams,
  getTeam,
  joinTeam,
  acceptRequest,
  rejectRequest,
};
