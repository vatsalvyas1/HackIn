import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hackathonName: {
      type: String,
      required: true,
      trim: true,
    },
    projectTitle: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    teamName: {
      type: String,
      trim: true,
    },
    achievement: {
      type: String,
      enum: ["1st", "2nd", "3rd", "Honorable Mention", "Participant"],
      default: "Participant",
    },
    techStack: {
      type: [String],
      default: [],
    },
    githubLink: {
      type: String,
      required: true,
    },
    liveDemo: {
      type: String, //optional
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
