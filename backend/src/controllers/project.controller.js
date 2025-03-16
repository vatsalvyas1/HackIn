import Project from "../models/project.model.js";

// Create a new project
export const createProject = async (req, res) => {
    try {
      const { hackathonName, projectTitle, description, teamName, achievement, techStack, githubLink, liveDemo, images } = req.body;
  
      const newProject = new Project({
        userId: req.user.id, // Assuming user is authenticated and req.user is available
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
  
      await newProject.save();
      res.status(201).json({ success: true, message: "Project created successfully", project: newProject });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

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