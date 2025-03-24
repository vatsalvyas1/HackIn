import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import Message from "../models/message.model.js";
import Team from "../models/team.model.js";

// Get all messages for a team
export const getTeamMessages = AsyncHandler(async (req, res) => {
  const { teamId } = req.params;

  if (!teamId) {
    throw new ApiError(400, "Team ID is required");
  }

  // Basic team membership check
  const team = await Team.findById(teamId);
  if (!team) {
    throw new ApiError(404, "Team not found");
  }

  const messages = await Message.find({ teamId })
    .sort({ createdAt: 1 })
    .populate("senderId", "name profileImage");

  return res
    .status(200)
    .json(new ApiResponse(200, messages, "Messages retrieved successfully"));
});

// Send a new message
export const sendMessage = AsyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const { content } = req.body;

  if (!teamId) {
    throw new ApiError(400, "Team ID is required");
  }
  if (!content || content.trim() === "") {
    throw new ApiError(400, "Message content is required");
  }

  const newMessage = await Message.create({
    teamId,
    senderId: req.user._id,
    content: content.trim()
  });

  // Populate sender info before sending response
  const populatedMessage = await Message.findById(newMessage._id)
    .populate("senderId", "name profileImage");

  return res
    .status(201)
    .json(new ApiResponse(201, populatedMessage, "Message sent successfully"));
});