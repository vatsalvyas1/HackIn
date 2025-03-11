import Router from "express";
const router = Router();
import { createOTP, verifyOTP } from "../controllers/otp.controller.js";

router.post("/send", createOTP);
router.post("/verify", verifyOTP);

export default router;