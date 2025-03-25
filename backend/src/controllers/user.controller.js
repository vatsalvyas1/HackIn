import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";

const completeUserProfile = AsyncHandler(async (req, res) => {
    const { userId, bio, username, skills, socialLinks } = req.body;

    if (!userId) throw new ApiError(400, "User ID is required");

    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    user.bio = bio || user.bio;
    user.skills = skills || user.skills;
    user.username = username || user.username;
    user.socialLinks = socialLinks || user.socialLinks;
    user.firstLogin = false;

    await user.save();

    res.status(200).json(new ApiResponse(200, user, "User updated successfully"));
});

const getProfile = AsyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!userId) throw new ApiError(400, "User ID is required");

    const user = await User.findById(userId).select("name bio username profileImage socialLinks contributionScore skills");

    if (!user) throw new ApiError(404, "User not found");

    res.status(200).json(new ApiResponse(200, user, "Fetched user profile"));
});

const getScores = AsyncHandler(async (req, res) => {
    const users = await User.find().select("name profileImage contributionScore _id").sort({ contributionScore: -1 });

    res.status(200).json(new ApiResponse(200, users, "Fetched user scores"));
});
    

export { completeUserProfile, getProfile, getScores };
