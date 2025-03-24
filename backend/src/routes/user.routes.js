import { Router } from "express";
import { completeUserProfile, getProfile, getScores } from "../controllers/user.controller.js";
const router = Router();

router.route("/complete-profile").post(
    completeUserProfile
);

router.route("/get-profile/:userId").get(
    getProfile
);

router.route("/get-scores").get(
    getScores
);

export default router;