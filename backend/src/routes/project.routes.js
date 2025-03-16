import express from "express";
import {
createProject,
getAllProjects,
getProjectById,
updateProjectById,
deleteProjectById,
} from "../controllers/project.controller.js";

const router = express.Router();

// Route to create a new project
router.post("/", createProject);

// Route to get all projects
router.get("/", getAllProjects);

// Route to get a single project by ID
router.get("/:id", getProjectById);

// Route to update a project by ID
router.put("/:id", updateProjectById);

// Route to delete a project by ID
router.delete("/:id", deleteProjectById);

export default router;