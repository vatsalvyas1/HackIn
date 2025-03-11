import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const createUser = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        throw new ApiError(400, "Please provide all fields");
    }

    const user = await User.create({ name, email, password });

    res.status(201).json(new ApiResponse("User created successfully", user));
});

export { createUser };

