import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { formatDistanceToNow } from "date-fns";
import {
  Heart,
  HeartOff,
  Github,
  MessageCircle,
  Share2,
  ArrowRight,
} from "lucide-react";
import clsx from "clsx";
import { backendUrl } from "../constanst";


const FeedList = ({ feeds, onLike, setFeeds }) => {
  const [showCommentBox, setShowCommentBox] = useState({});
  const [commentText, setCommentText] = useState({});

  if (!Array.isArray(feeds)) {
    return (
      <div className="text-center py-12 text-neutral-400">
        <div className="animate-pulse">Loading feeds...</div>
      </div>
    );
  }

  if (feeds.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-400">
        <p className="text-lg mb-2">No feeds available yet</p>
        <p className="text-sm">Be the first to share something!</p>
      </div>
    );
  }

  const storedUser = localStorage.getItem("user");
  const userId = JSON.parse(storedUser)?._id;

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`${backendUrl}/feed/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      
      if (!response.ok) throw new Error(await response.text());
  
      const data = await response.json();
  
      setFeeds((prevFeeds) =>
        prevFeeds.map((feed) =>
          feed._id === postId
            ? { ...feed, likes: data.data.likes } // Update the entire likes array
            : feed
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  
  const handleCommentClick = (feedId) => {
    setShowCommentBox((prev) => ({
      ...prev,
      [feedId]: !prev[feedId],
    }));
  };

  const handleCommentSubmit = async (feedId) => {
    const storedUser = localStorage.getItem("user");
    const userId = JSON.parse(storedUser)?._id;

    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    try {
      const response = await fetch(
        `${backendUrl}/api/v1/feed/${feedId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, text: commentText[feedId] }),
        }
      );

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      setFeeds((prevFeeds) =>
        prevFeeds.map((feed) =>
          feed._id === feedId ? { ...feed, comments: data.comments } : feed
        )
      );
      setCommentText((prev) => ({
        ...prev,
        [feedId]: "",
      }));
      window.location.reload();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="space-y-6">
      {feeds.map((feed) => (
        <div
          key={feed._id}
          className="bg-neutral-800 backdrop-blur-sm rounded-lg border border-neutral-700 shadow-lg transform hover:translate-y-[-2px] transition-all duration-200"
        >
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center overflow-hidden shadow-lg">
                {feed.userId.profileImage ? (
                  <img
                    src={feed.userId.profileImage}
                    alt={feed.userId.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-lg">
                    {feed.userId.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {feed.userId.name}
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      {formatDistanceToNow(new Date(feed.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300">
                    Feed
                  </div>
                </div>

                <div className="prose prose-invert max-w-none mb-6">
                  <div
                    className="text-neutral-200"
                    dangerouslySetInnerHTML={{ __html: feed.content }}
                  />
                </div>

                {feed.codeSnippet && (
                  <div className="mb-6 overflow-hidden rounded-lg border border-neutral-700/50">
                    <SyntaxHighlighter
                      language="javascript"
                      style={vscDarkPlus}
                      className="!bg-neutral-900/50 !m-0"
                      customStyle={{ padding: "1.5rem" }}
                    >
                      {feed.codeSnippet}
                    </SyntaxHighlighter>
                  </div>
                )}

                {feed.image && (
                  <div className="mb-6">
                    <img
                      src={feed.image}
                      alt="Feed content"
                      className="rounded-lg w-xl object-cover max-h-xl mx-auto"
                    />
                  </div>
                )}

                {feed.video && (
                  <div className="mb-6">
                    <video
                      controls
                      className="rounded-lg w-full max-h-[500px]"
                      preload="metadata"
                    >
                      <source src={feed.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-neutral-700/50">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(feed._id)}
                      className={clsx(
                        "flex items-center space-x-2 transition-colors",
                        "hover:text-red-400",
                        feed.likes?.includes(userId)
                          ? "text-red-500"
                          : "text-neutral-400"
                      )}
                    >
                      {feed.likes?.includes(userId) ? (
                        <Heart className="fill-current" size={20} />
                      ) : (
                        <HeartOff size={20} />
                      )}
                      <span className="text-sm font-medium">
                        {feed.likes?.length || 0}
                      </span>
                    </button>

                    <button
                      onClick={() => handleCommentClick(feed._id)}
                      className={clsx(
                        "flex items-center space-x-2 transition-colors",
                        showCommentBox[feed._id]
                          ? "text-blue-400"
                          : "text-neutral-400",
                        "hover:text-blue-400"
                      )}
                    >
                      <MessageCircle size={20} />
                      <span className="text-sm font-medium">{feed.comments?.length || 0}</span>
                    </button>

                    <button className="flex items-center space-x-2 text-neutral-400 hover:text-green-400 transition-colors">
                      <Share2 size={20} />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                  </div>

                  {feed.githubLink && (
                    <a
                      href={feed.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx(
                        "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        "bg-neutral-700/30 hover:bg-neutral-700/50",
                        "text-neutral-200 hover:text-white"
                      )}
                    >
                      <Github size={16} />
                      <span>View on GitHub</span>
                    </a>
                  )}
                </div>

                {showCommentBox[feed._id] && (
                  <div className="mt-4 flex space-x-2">
                    <input
                      type="text"
                      value={commentText[feed._id] || ""}
                      onChange={(e) =>
                        setCommentText((prev) => ({
                          ...prev,
                          [feed._id]: e.target.value,
                        }))
                      }
                      placeholder="Write a comment..."
                      className="flex-1 bg-neutral-700/30 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                    <button
                      onClick={() => handleCommentSubmit(feed._id)}
                      className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 transition-colors"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                )}

                {feed.comments && feed.comments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {feed.comments.map((comment, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center overflow-hidden shadow-lg">
                          {comment.userId?.profileImage ? (
                            <img
                              src={comment.userId.profileImage}
                              alt={comment.userId.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-sm">
                              {comment.userId?.name?.charAt(0).toUpperCase() ||
                                "U"}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 bg-neutral-700/30 rounded-lg p-2">
                          <p className="text-white text-sm">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedList;
