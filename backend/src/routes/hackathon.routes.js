import Router from "express";
import { createHackathon, getHackathons, getbyId, addTeamRequest } from "../controllers/hackathon.controller.js";

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

export default router;