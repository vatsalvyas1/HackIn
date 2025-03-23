import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { formatDistanceToNow } from "date-fns";
import { Heart, HeartOff, Github, MessageCircle, Share2 } from "lucide-react";
import clsx from "clsx";

const FeedList = ({ feeds, onLike }) => {
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

  return (
    <div className="space-y-6">
      {feeds.map((feed) => (
        <div
          key={feed._id}
          className="bg-neutral-800/50 backdrop-blur-sm rounded-lg border border-neutral-700/50 shadow-lg transform hover:translate-y-[-2px] transition-all duration-200"
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
                      className="rounded-lg w-full object-cover max-h-[500px]"
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
                      onClick={() => onLike(feed._id)}
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

                    <button className="flex items-center space-x-2 text-neutral-400 hover:text-blue-400 transition-colors">
                      <MessageCircle size={20} />
                      <span className="text-sm font-medium">0</span>
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
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedList;