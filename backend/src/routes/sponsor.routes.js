import express from "express";
import {
  getSponsors,
  getSponsor,
  createSponsor,
  createSponsorshipRequest,
  acceptSponsorshipRequest,
  rejectSponsorshipRequest,
} from "../controllers/sponsor.controller.js";

const router = express.Router();

router.get("/", getSponsors); // GET /api/v1/sponsors

router.get("/:id", getSponsor); // GET /api/v1/sponsors/:id

router.post("/", createSponsor); // POST /api/v1/sponsors

// Create a new sponsorship request
router.post("/create-request", createSponsorshipRequest); // POST /api/v1/sponsors/create-request

// Accept a sponsorship request
router.post("/accept-request", acceptSponsorshipRequest); // POST /api/v1/sponsors/accept-request

// Reject a sponsorship request
router.post("/reject-request", rejectSponsorshipRequest); // POST /api/v1/sponsors/reject-request

export default router;
