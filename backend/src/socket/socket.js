import { Server } from "socket.io";
import Message from "../models/message.model.js";

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
          origin: [
            "http://localhost:5173",
            "https://hack-in-sooty.vercel.app",
            "http://localhost:3000"
          ],
          methods: ["GET", "POST"],
          credentials: true 
        }
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    // Join a team room
    socket.on("join_team", (teamId) => {
        if (!teamId) {
          console.warn("join_team event received without teamId");
          return;
        }
        socket.join(teamId);
        console.log(`User joined team ${teamId}`);
      });

 // Handle new chat messages
 socket.on("send_message", async (data) => {
    try {
      const { teamId, senderId, senderName, content } = data;
      
      // Save message to database
      const newMessage = new Message({
        teamId,
        senderId,
        senderName,
        content,
        type: "message"
      });

      const savedMessage = await newMessage.save();
      
      // Broadcast to all team members
      io.to(teamId).emit("new_message", savedMessage);
    } catch (error) {
      console.error("Error handling message:", error);
    }
  });

      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });      
  });

  return io;
};

export const getIO = () => {
    if (!io) {
      console.warn("Socket.io not initialized. Returning default instance.");
      return new Server(); // Returns a default instance to avoid crashes.
    }
    return io;
  };
  