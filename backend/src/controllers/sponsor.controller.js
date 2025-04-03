import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import Sponsor from "../models/sponsor.model.js";

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
      .populate('user', 'name email'); // Only populate user details
  
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

export { getSponsors, getSponsor, createSponsor };