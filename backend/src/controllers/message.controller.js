import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import Message from "../models/message.model.js";
import Team from "../models/team.model.js";
import { getIO } from "../socket/socket.js";


// // Send a new message
// export const sendMessage = async (req, res) => {
//   try {
//     const { teamId } = req.params;
//     const { senderId, senderName, content } = req.body;

//     const newMessage = new Message({
//       teamId,
//       senderId,
//       senderName,
//       content,
//     });

//     const savedMessage = await newMessage.save();
    
//     // Emit the new message to all team members
//     io.to(teamId).emit("new_message", savedMessage);
    
//     res.status(201).json(savedMessage);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Get all messages for a team
export const getTeamMessages = AsyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const { userId } = req.body; 

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const team = await Team.findById(teamId).populate("teamMembers", "name email");
  if (!team) {
    throw new ApiError(404, "Team not found");
  }

  // Check if user is part of the team
  if (!team.members.includes(userId) && team.leader.toString() !== userId) {
    throw new ApiError(403, "You are not part of this team");
  }

  const messages = await Message.find({ teamId }).sort({ createdAt: 1 }).limit(100);

  return res.status(200).json(new ApiResponse(200, messages, "Messages fetched successfully"));
});


export const sendNotification = AsyncHandler(async (teamId, message) => {
  try {
    const io = getIO();
    if (!io) {
      throw new ApiError(500, "Socket.io not initialized");
    }

    const newMessage = new Message({
      teamId,
      senderName: "System",
      content: message,
      type: "notification",
    });

    const savedMessage = await newMessage.save();
    io.to(teamId).emit("new_message", savedMessage);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
});

// Send notification when someone joins the team
export const sendJoinNotification = async (teamId, userName) => {
  try {
    const io = getIO();

    const notification = `${userName} has joined the team`;
    const newMessage = new Message({
      teamId,
      senderName: "System",
      content: notification,
      type: "notification",
    });

    const savedMessage = await newMessage.save();
    io.to(teamId).emit("new_message", savedMessage);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};