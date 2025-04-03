import express from "express";
import {
  getSponsors,
  getSponsor,
  createSponsor
} from "../controllers/sponsor.controller.js";

const router = express.Router();

router.get("/", getSponsors); // GET /api/v1/sponsors

router.get("/:id", getSponsor); // GET /api/v1/sponsors/:id

router.post("/", createSponsor); // POST /api/v1/sponsors

export default router;