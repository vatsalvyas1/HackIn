import Router from "express";
import { createHackathon, getHackathons, getbyId, addTeamRequest, addTeam, rejectApplication, getMyHackathons } from "../controllers/hackathon.controller.js";

const router = Router();

router.route("/create-hackathon").post(
    createHackathon
);

router.route("/get-hackathons").get(
    getHackathons
);

router.route("/get-hackathon/:id").get(
    getbyId
);

router.route("/add-team-request/:id").post(
    addTeamRequest
);

router.route("/add-team/:id").post(
    addTeam
);

router.route("/reject-application/:id").post(
    rejectApplication
);

router.route("/get-my-hackathons").post(
    getMyHackathons
);

export default router;