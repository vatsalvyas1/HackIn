import Router from "express";
import { createTeam, getTeams } from "../controllers/team.controller.js";
const router = Router();

router.route("/create-team").post(
    createTeam
)

router.route("/get-all").get(
    getTeams
)

export default router;