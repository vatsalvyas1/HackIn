import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import Feed from "../models/feed.model.js";
import { uploadOnCloud } from "../utils/cloudinary.js";

// Create a new feed post
export const createFeedPost = AsyncHandler(async (req, res) => {
  const { userId, content, codeSnippet, githubLink } = req.body;

  console.log(req.body);
  console.log(req.files);

  if (!userId ) {
    throw new ApiError(400, "User ID is required");
  }
  if (!content) {
    throw new ApiError(400, "Content is required");
  }

  let imageUrl = null;
  let videoUrl = null;

  if (req.files?.image) {
    const uploadedImage = await uploadOnCloud(req.files.image[0].path);
    imageUrl = uploadedImage?.url;
  }

  if (req.files?.video) {
    const uploadedVideo = await uploadOnCloud(req.files.video[0].path);
    videoUrl = uploadedVideo?.url;
  }

  const newFeed = await Feed.create({
    userId,
    content,
    image: imageUrl,
    video: videoUrl,
    codeSnippet,
    githubLink,
  });

  res.status(201).json(new ApiResponse(201, newFeed, "Post created successfully"));
});

// Get all feed posts
export const getAllFeedPosts = AsyncHandler(async (req, res) => {
  const posts = await Feed.find()
    .populate("userId", "name email profileImage") 
    .populate("comments.userId", "name profileImage")
    .sort({ createdAt: -1 }); 
  res.status(200).json(new ApiResponse(200, posts, "Posts fetched successfully"));
});

// Get a single feed post by ID
export const getFeedPostById = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Feed.findById(id)
    .populate("userId", "name email profileImage") 
    .populate("comments.userId", "name profileImage"); 

  if (!post) throw new ApiError(404, "Post not found");

  res.status(200).json(new ApiResponse(200, post, "Post fetched successfully"));
});

// Delete a feed post
export const deleteFeedPost = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedPost = await Feed.findByIdAndDelete(id);

  if (!deletedPost) throw new ApiError(404, "Post not found");

  res.status(200).json(new ApiResponse(200, {}, "Post deleted successfully"));
});

//like post
export const likeFeedPost = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) throw new ApiError(400, "User ID is required");

  const post = await Feed.findById(id);
  if (!post) throw new ApiError(404, "Post not found");

  // Check if the user has already liked the post
  const likeIndex = post.likes.indexOf(userId);

  if (likeIndex !== -1) {
    // Unlike: Remove the user from likes
    post.likes.splice(likeIndex, 1);
  } else {
    // Like: Add the user ID to likes
    post.likes.push(userId);
  }

  await post.save();
  
  // Return the entire updated post or at least the likes array
  res.status(200).json(
    new ApiResponse(200, { likes: post.likes }, "Like status updated")
  );
});

// Comment on a post
export const commentOnFeedPost = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId, text } = req.body;

  if (!text) throw new ApiError(400, "Comment text is required");

  const post = await Feed.findById(id);
  if (!post) throw new ApiError(404, "Post not found");

  post.comments.push({ userId, text });
  await post.save();

  const updatedPost = await Feed.findById(id).populate("comments.userId", "name profileImage");

  res.status(200).json(new ApiResponse(200, post, "Comment added successfully"));
});
