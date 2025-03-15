import { Router } from "express";
import { completeUserProfile, getProfile } from "../controllers/user.controller.js";
const router = Router();

router.route("/complete-profile").post(
    completeUserProfile
);

router.route("/get-profile/:userId").get(
    getProfile
);

export default router;