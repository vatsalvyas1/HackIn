import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloud } from "../utils/cloudinary.js";

const createUser = AsyncHandler(async (req, res) => {
    const { oauthProvider, oauthId, name, email, password, bio, skills, socialLinks, experinceLevel } = req.body;

    if(!oauthProvider || !oauthId || !name || !email || !password || !skills || !socialLinks || !experinceLevel) {
        throw new ApiError(400, "Please provide all the required fields");
    }

    const profilePath = req.file ? req.file.path : null;
    if(!profilePath) {
        throw new ApiError(400, "Please provide a profile image");
    }

    const profileImage = await uploadOnCloud(profilePath);
    if(!profileImage) {
        throw new ApiError(500, "Failed to upload profile image");
    }

    const user = await User.create({
        oauthProvider,
        oauthId,
        name,
        email,
        password,
        bio,
        profileImage : profileImage.url,
        skills,
        socialLinks,
        experinceLevel
    });

    res.status(201).json(new ApiResponse("User created successfully", user));
});

export { createUser };

