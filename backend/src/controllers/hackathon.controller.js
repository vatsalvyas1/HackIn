import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Hackathon from "../models/hackathon.model.js";
import User from "../models/user.model.js";

const createHackathon = AsyncHandler(async(req,res) => {
    const {name, organizer, description, startDate, endDate, mode, prizePool,firstPrize, secondPrize, thirdPrize, track, registrationDeadline, minTeamSize, maxTeamSize, colorTheme, collegeRepresenting, website, sponsors} = req.body;

    if(!name || !organizer || !description || !startDate || !endDate || !mode || !registrationDeadline || !minTeamSize || !maxTeamSize || !collegeRepresenting || !colorTheme  || !firstPrize || !secondPrize || !thirdPrize || !track){
        throw new ApiError(404,"some fields are missing");
    }

    const {address , city , state , country , postalCode} = req.body;
    // if(!address || !city || !state || !country || !postalCode){
    //     throw new ApiError(404,"Location fields are missing");
    // }
    const location = {
        address,
        city,
        state,
        country,
        postalCode
    }

    const user = await User.findById(organizer);
    if(!user){
        throw new ApiError(404,"User not found");
    }

    const hackathon = await Hackathon.create({
        name,
        organizer,
        description,
        startDate,
        endDate,
        location,
        collegeRepresenting,
        colorTheme,
        mode,
        prizePool,
        track,
        prizes : {
            first : firstPrize,
            second : secondPrize,
            third : thirdPrize
        },
        registrationDeadline,
        minTeamSize,
        maxTeamSize,
        sponsors,
        website
    })

    if(!hackathon){
        throw new ApiError(404,"Hackathon not created");
    }

    res.status(201).json(new ApiResponse("Hackathon created",hackathon));
})

const getHackathons = AsyncHandler(async(req,res) => {
    const hackathons = await Hackathon.find().populate('organizer');
    if(!hackathons){
        throw new ApiError(404,"No hackathons found");
    }
    res.status(200).json(new ApiResponse("Hackathons found",hackathons));
})

export {createHackathon, getHackathons};