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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
        message: { type: String },
      },
    ],
    teamScore: {
      type: Number,
      default: 0,
    },
    isTeamFull: {
      type: Boolean,
      default: false, // Auto-updated when the team reaches max size
    },
    isLive : {
      type : Boolean,
      required : true,
    }
  },
  { timestamps: true }
);

TeamSchema.pre("save", async function (next) {
  // Update `isTeamFull`
  this.isTeamFull = this.teamMembers.length >= this.teamSize;

  // Populate `teamMembers` to access their `contributionScore`
  const populatedTeam = await this.populate("teamMembers");

  // Calculate `teamScore` based on the `contributionScore` of each member
  this.teamScore = populatedTeam.teamMembers.reduce((acc, member) => {
    return acc + (member.contributionScore || 0); // Ensure `contributionScore` exists, default to 0 if not
  }, 0);

  next();
});

const Team = mongoose.model("Team", TeamSchema);
export default Team;