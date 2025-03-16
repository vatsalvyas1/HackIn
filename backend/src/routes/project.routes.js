import express from "express";
import { createProject, getAllProjects, getProjectById, updateProjectById, deleteProjectById, getProjectsByUserId } from "../controllers/project.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

// Route to create a new project
router.post("/",upload.fields(
    [{name : "images"}]
), createProject);

// Route to get all projects
router.get("/", getAllProjects);

// Route to get a single project by ID
router.get("/:id", getProjectById);

// Route to update a project by ID
router.put("/:id", updateProjectById);

// Route to delete a project by ID
router.delete("/:id", deleteProjectById);

// Route to get projects by user ID
router.get("/user/:userId", getProjectsByUserId);

export default router;