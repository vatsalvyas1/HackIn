import Router from "express";
import { createTeam, getTeams, joinTeam, getTeamRequests, getTeam } from "../controllers/team.controller.js";
const router = Router();

router.route("/create-team").post(
    createTeam
)

router.route("/get-all").get(
    getTeams
)

router.route("/get-team/:teamId").get(
    getTeam
)

router.route("/join-team").post(
    joinTeam
)

router.route("/get-requests/:teamId").get(
    getTeamRequests
)

export default router;