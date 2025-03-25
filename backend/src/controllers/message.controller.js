import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import Message from "../models/message.model.js";
import Team from "../models/team.model.js";

// Get all messages for a team
export const getTeamMessages = async (req, res) => {
  try {
    const { teamId } = req.params;
    const messages = await Message.find({ teamId })
      .sort({ createdAt: 1 })
      .limit(100);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send a new message
export const sendMessage = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { senderId, senderName, content } = req.body;

    const newMessage = new Message({
      teamId,
      senderId,
      senderName,
      content,
    });

    const savedMessage = await newMessage.save();
    
    // Emit the new message to all team members
    io.to(teamId).emit("new_message", savedMessage);
    
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendNotification = async (teamId, message) => {
  try {
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
};