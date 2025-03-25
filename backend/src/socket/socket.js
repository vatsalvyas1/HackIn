import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
    },
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
  