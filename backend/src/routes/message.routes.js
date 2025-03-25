import express from "express";
import {
  getTeamMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.route("/:teamId").get(getTeamMessages);
router.route("/:teamId").post(sendMessage);

export default router;

