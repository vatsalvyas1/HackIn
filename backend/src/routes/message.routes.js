import express from "express";
import {
  getTeamMessages,
  sendMessage,
} from "../controllers/message.controller";

const router = express.Router();

router.route("/:teamId").get(getTeamMessages);
router.route("/:teamId").post(sendMessage);

export default router;

