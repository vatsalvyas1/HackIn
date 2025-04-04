import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import Sponsor from "../models/sponsor.model.js";
import Hackathon from "../models/hackathon.model.js";
import { request } from "express";

// @route   GET /api/v1/sponsors
const getSponsors = AsyncHandler(async (req, res) => {
    const sponsors = await Sponsor.find()
      .populate('user', 'name email') // Only populate user details
      .sort({ createdAt: -1 });
  
    return res
      .status(200)
      .json(new ApiResponse(200, sponsors, "All sponsors fetched successfully"));
  });

// @route   GET /api/v1/sponsors/:id
const getSponsor = AsyncHandler(async (req, res) => {
    const sponsor = await Sponsor.findById(req.params.id)
      .populate('user', 'name email')
      .populate("sponsorshipRequests.hackathon")
      .populate("acceptSponsorshipRequests.hackathon"); ; 
  
    if (!sponsor) {
      throw new ApiError(404, "Sponsor not found");
    }
  
    return res
      .status(200)
      .json(new ApiResponse(200, sponsor, "Sponsor details fetched successfully"));
  });

// @route   POST /api/v1/sponsors
const createSponsor = AsyncHandler(async (req, res) => {
    const {
      name,
      description,
      website,
      logo, 
      contactEmail,
      tier,
      userId
    } = req.body;
  
    if (!name || !description || !website || !logo || !contactEmail || !userId) {
      throw new ApiError(400, "All fields are required");
    }
  
    const sponsor = await Sponsor.create({
      name,
      description,
      website,
      logo, 
      contactEmail,
      user: userId,
      tier: tier || 'Bronze'
    });
  
    return res
      .status(201)
      .json(new ApiResponse(201, sponsor, "Sponsor created successfully"));
  });

  // Send sponsorship request
const createSponsorshipRequest = AsyncHandler(async (req, res) => {
    const { sponsorId, hackathonId, message } = req.body;
  
    // Validate input
    if (!sponsorId || !hackathonId) {
      throw new ApiError(400, "Sponsor ID and Hackathon ID are required");
    }
  
    // Check if sponsor and hackathon exist
    const sponsor = await Sponsor.findById(sponsorId);
    const hackathon = await Hackathon.findById(hackathonId);
  
    if (!sponsor || !hackathon) {
      throw new ApiError(404, "Sponsor or hackathon not found");
    }
  
    sponsor.sponsorshipRequests.push({
        hackathon: hackathonId,
        message: message || "No message provided"
    });
  
    await sponsor.save();
  
    res.status(201).json(
      new ApiResponse(201, sponsor, "Sponsorship request sent successfully")
    );
  });
  
  // Accept sponsorship request
  const acceptSponsorshipRequest = AsyncHandler(async (req, res) => {
    const { sponsorId, hackathonId } = req.body;

    if (!sponsorId || !hackathonId) {
      throw new ApiError(400, "Sponsor ID and Hackathon ID are required");
    }

    const sponsor = await Sponsor.findById(sponsorId);
    const hackathon = await Hackathon.findById(hackathonId);

    if(!sponsor || !hackathon) {
      throw new ApiError(404, "Sponsor or hackathon not found");
    }

    const newSponsorshipsRequest = sponsor.sponsorshipRequests.filter((request) => {
      return request.hackathon.toString() !== hackathonId.toString();
    })

    sponsor.sponsorshipRequests = newSponsorshipsRequest;
    sponsor.acceptSponsorshipRequests.push({
      hackathon: hackathonId,
      message: "Sponsorship request accepted"
    });

    await sponsor.save();
    res.status(200).json(
      new ApiResponse(200, sponsor, "Sponsorship request accepted")
    );
  });
  
  // Reject sponsorship request
  const rejectSponsorshipRequest = AsyncHandler(async (req, res) => {
    const { sponsorId, hackathonId } = req.body;
    
    if (!sponsorId || !hackathonId) {
      throw new ApiError(400, "Sponsor ID and Hackathon ID are required");
    }

    const sponsor = await Sponsor.findById(sponsorId);
    const hackathon = await Hackathon.findById(hackathonId);

    if(!sponsor || !hackathon) {
      throw new ApiError(404, "Sponsor or hackathon not found");
    }

    const newSponsorshipsRequest = sponsor.sponsorshipRequests.filter((request) => {
      return request.hackathon.toString() !== hackathonId.toString();
    })
    sponsor.sponsorshipRequests = newSponsorshipsRequest;
    await sponsor.save();
    res.status(200).json(
      new ApiResponse(200, sponsor, "Sponsorship request rejected")
    );
  });

export { getSponsors, getSponsor, createSponsor, createSponsorshipRequest, acceptSponsorshipRequest, rejectSponsorshipRequest };