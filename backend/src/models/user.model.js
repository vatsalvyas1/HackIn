import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    oauthProvider: {
      type: String,
      enum: ["google", "github"],
      required: true,
    },
    oauthId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
      type: String, // URL to profile image
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    skills: [
      {
        type: String,
      },
    ],
    socialLinks: {
      github: String,
      portfolio: String,
    },
    experienceLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    pastHackathons: [
      {
        name: String,
        year: Number,
        position: String, // e.g., "Winner", "Finalist", "Participant"
      },
    ],
    contributionScore: {
      type: Number,
      default: 0, // Points earned from hackathons
    },
    rankingLevel: {
      type: String,
      enum: ["Newbie", "Rookie", "Pro", "Elite", "Legend"],
      default: "Newbie",
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    messages: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

//to protect password
UserSchema.pre("save", async function(next){
        if(!this.isModified("password")) return next();
        this.password = await bcrypt.hashSync(this.password, 10);
       next();
    }
);

//to compare password
UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);
export { User };