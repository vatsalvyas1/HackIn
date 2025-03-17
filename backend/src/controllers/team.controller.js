import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Team from "../models/team.model.js";

const createTeam = AsyncHandler(async (req,res) => {
    const {userId,teamName, hackathonName, description, teamSize, location, lookingFor, startDate, endDate, skills} = req.body;

    if(!userId || !teamName || !hackathonName || !description || !teamSize || !lookingFor || !startDate || !endDate || !skills){
        throw new ApiError(400,"enter all feilds");
    }

    const lookingForArr = lookingFor.split(", ");
    const teamMembers = [{userId, role:"Leader"}];
    const dates = {
        startDate,
        endDate
    }

    const team = await Team.create(
        {
            teamName,
            hackathonName,
            description,
            teamSize,
            location,
            lookingFor : lookingForArr,
            dates,
            skills,
            teamLeader : userId,
            teamMembers
        }
    )

    if(!team) throw new ApiError(400,"error creating team");

    res.status(201).json(new ApiResponse(201,team,"team created successfully"));
})

const getTeams = AsyncHandler(async(req,res) => {
    const teams = await Team.find();

    res.status(201).json(new ApiResponse(201,teams,"fetched all teams"));
})

export {createTeam,getTeams}