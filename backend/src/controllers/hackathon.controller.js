import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Hackathon from "../models/hackathon.model.js";
import User from "../models/user.model.js";
import Team from "../models/team.model.js";

const createHackathon = AsyncHandler(async(req,res) => {
    const {name, organizer, description, startDate, endDate, mode, prizePool,firstPrize, secondPrize, thirdPrize, track, registrationDeadline, minTeamSize, maxTeamSize, colorTheme, collegeRepresenting, website, sponsorName, sponsorLogo} = req.body;

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

    const sponsors = [{
        name : sponsorName,
        logo : sponsorLogo
    }];

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

const getbyId = AsyncHandler(async(req,res) => {
    const {id} = req.params;
    const hackathon = await Hackathon.findById(id)
    .populate("applications")
    .populate("participants");
    if(!hackathon){
        throw new ApiError(404,"Hackathon not found");
    }
    res.status(200).json(new ApiResponse("Hackathon found",hackathon));
}
);

const addTeamRequest = AsyncHandler(async(req,res) => {
    const {id} = req.params;
    const {teamId} = req.body;

    const hackathon = await Hackathon.findById(id);
    const team = await Team.findById(teamId);
    if(!team){
        throw new ApiError(404,"Team not found");
    }

    if(!hackathon){
        throw new ApiError(404,"Hackathon not found");
    }

    hackathon.applications.push(team._id);
    await hackathon.save();
    res.status(200).json(new ApiResponse("Team request added",hackathon));
}
);

const addTeam = AsyncHandler(async(req,res) => {
    const {id} = req.params;
    const {teamId} = req.body;

    const hackathon = await Hackathon.findById(id);
    if(!hackathon){
        throw new ApiError(404,"Hackathon not found");
    }

    const newApplications = hackathon.applications.filter((application) => {
        return application.toString() !== teamId;
    });

    hackathon.applications = newApplications;
    hackathon.participants.push(teamId);

    await hackathon.save();
    res.status(200).json(new ApiResponse("Team added to hackathon",hackathon));
}
);

const rejectApplication = AsyncHandler(async(req,res) => {
    const {id} = req.params;
    const {teamId} = req.body;

    const hackathon = await Hackathon.findById(id);
    if(!hackathon){
        throw new ApiError(404,"Hackathon not found");
    }

    const newApplications = hackathon.applications.filter((application) => {
        return application.toString() !== teamId;
    }
    );

    hackathon.applications = newApplications;

    await hackathon.save();
    res.status(200).json(new ApiResponse("Team removed from hackathon",hackathon));
}
);

const getMyHackathons = AsyncHandler(async(req,res) => {
    const {userId} = req.body;
    console.log(userId);
    const hackathons = await Hackathon.find({organizer : userId});
    if(!hackathons){
        throw new ApiError(404,"No hackathons found");
    }
    res.status(200).json(new ApiResponse("Hackathons found",hackathons));
});

export {createHackathon, getHackathons, getbyId, addTeamRequest, addTeam, rejectApplication, getMyHackathons};