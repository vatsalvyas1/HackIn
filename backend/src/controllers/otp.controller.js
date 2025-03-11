import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { OTP } from "../models/otp.model.js";
import { sendOtp } from "../utils/sendotp.js";

const createOTP = AsyncHandler(async (req, res) => {
    const { email } = req.body;

    if(!email) {
        throw new ApiError(400, "Please provide email");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    const existingOTP = await OTP.findOne({ email });
    if(existingOTP) {
        existingOTP.otp = otp;
        existingOTP.expiry = expiry;
        await existingOTP.save();

        sendOtp(email, otp);

        res.status(201).json(new ApiResponse("OTP created successfully"));
        return;
    }

    await OTP.create({
        email,
        otp,
        expiry,
    })

    sendOtp(email, otp);

    res.status(201).json(new ApiResponse("OTP created successfully"));
});

const verifyOTP = AsyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if(!email || !otp) {
        throw new ApiError(400, "Please provide email and otp");
    }

    const existingOTP = await OTP.findOne({ email });
    if(!existingOTP) {
        throw new ApiError(400, "OTP not found");
    }

    if(existingOTP.otp !== otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    if(existingOTP.expiry < new Date()) {
        throw new ApiError(400, "OTP expired");
    }

    await OTP.deleteOne({email});
    res.status(200).json(new ApiResponse("OTP verified successfully"));
});

export { createOTP, verifyOTP };