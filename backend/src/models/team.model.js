import mongoose from "mongoose";
import crypto from "crypto";

const TeamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    lookingFor: [
      {
        type: String, // e.g., "Frontend Dev", "UI/UX Designer", "AI Engineer"
      },
    ],
    description: {
      type: String,
      maxlength: 500,
    },
    teamSize: {
      type: Number,
      required: true,
      default: 2, // At least 2 people in a team
    },
    hackathonName: {
      type: String,
      required: true,
    },
    dates: {
      startDate: { type: String },
      endDate: { type: String },
    },
    location: {
      type: String,
    },
    teamMembers: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String }, // Optional role within the team
      },
    ],
    skills: [
      {
        type: String, // Aggregated skills of the team members
      },
    ],
    teamCode: {
      type: String,
      unique: true,
      default: () => crypto.randomBytes(3).toString("hex").toUpperCase(), // Generates a 6-char alphanumeric code
    },
    teamLeader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    joinRequests: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
      },
    ],
    isTeamFull: {
      type: Boolean,
      default: false, // Auto-updated when the team reaches max size
    },
  },
  { timestamps: true }
);

// Middleware to update `isTeamFull` before saving
TeamSchema.pre("save", function (next) {
  this.isTeamFull = this.teamMembers.length >= this.teamSize; // Use `>=` to handle edge cases
  next();
});

const Team = mongoose.model("Team", TeamSchema);
export default Team;