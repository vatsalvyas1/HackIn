import express from "express";
import {
  createFeedPost,
  getAllFeedPosts,
  getFeedPostById,
  deleteFeedPost,
  likeFeedPost,
  commentOnFeedPost,
} from "../controllers/feed.controller.js";

const router = express.Router();

router.post("/", createFeedPost); // Create a post
router.get("/", getAllFeedPosts); // Get all posts
router.get("/:id", getFeedPostById); // Get a single post by ID
router.delete("/:id", deleteFeedPost); // Delete a post
router.post("/:id/like", likeFeedPost); // Like/unlike a post
router.post("/:id/comment", commentOnFeedPost); // Comment on a post

export default router;
