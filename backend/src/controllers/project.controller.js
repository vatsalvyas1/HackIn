import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import Project from "../models/project.model.js";
import { uploadOnCloud } from "../utils/cloudinary.js";

// Create a new project
export const createProject = AsyncHandler(async (req, res) => {
  const {
    hackathonName,
    projectTitle,
    description,
    teamName,
    achievement,
    techStack,
    githubLink,
    liveDemo,
    userId,
  } = req.body;

  if (
    !hackathonName ||
    !projectTitle ||
    !description ||
    !teamName ||
    !achievement ||
    !techStack ||
    !githubLink ||
    !userId
  ) {
    throw new ApiError(401, "enter all feilds");
  }

  const localImages = req.files?.images;
  let images = [];

  for (let i = 0; i < localImages.length; i++) {
    const imageUrl = await uploadOnCloud(localImages[i].path);
    images.push(imageUrl?.url);
  }

  const project = await Project.create({
    userId,
    hackathonName,
    projectTitle,
    description,
    teamName,
    achievement,
    techStack,
    githubLink,
    liveDemo,
    images,
  });

  res.status(201).json(new ApiResponse(201, project, "added successfully"));
});

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a project by ID
export const updateProjectById = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a project by ID
export const deleteProjectById = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
