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

    res.status(201).json(new ApiResponse(201, user, "user updated succesfully"));
});

const getProfile = AsyncHandler(async (req,res) => {
    const {userId} = req.params;
    if(!userId) throw new ApiError(400,"userId not found");

    const user = await User.findById(userId);
    if(!user) throw new ApiError(404,"user not found");

    res.status(201).json(new ApiResponse(201,user,"fetched User"));
})

export { completeUserProfile, getProfile };
