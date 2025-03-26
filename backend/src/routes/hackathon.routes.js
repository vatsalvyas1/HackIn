import Router from "express";
import { createHackathon, getHackathons } from "../controllers/hackathon.controller.js";

const router = Router();

router.route("/create-hackathon").post(
    createHackathon
);

router.route("/get-hackathons").get(
    getHackathons
);

export default router;