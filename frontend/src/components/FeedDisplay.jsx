import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { formatDistanceToNow } from "date-fns";
import { Heart, HeartOff } from "lucide-react";

const FeedList = ({ feeds, onLike}) => {
  if (!Array.isArray(feeds)) {
    console.error("feeds is not an array:", feeds);
    return <div className="text-white">No feeds available.</div>;
  }

  const storedUser = localStorage.getItem("user");
  const userId = JSON.parse(storedUser)?._id;

  return (
    <div className="space-y-4">
      {feeds.map((feed) => (
        <div
          key={feed._id}
          className="bg-neutral-800 p-6 border-x border-b border-neutral-700 hover:bg-neutral-800/80 transition-colors duration-300"
        >
          <div className="flex items-start space-x-4">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
              <img
                src={feed.userId.profileImage}
                alt="Profile"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-medium">{feed.userId.name}</h3>
                  <p className="text-neutral-400 text-sm">
                    {formatDistanceToNow(new Date(feed.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className="bg-neutral-700 px-2 py-1 rounded text-xs text-white">
                  Feed
                </div>
              </div>
              <div
                className="text-neutral-300 mb-4"
                dangerouslySetInnerHTML={{ __html: feed.content }}
              />
              {feed.codeSnippet && (
                <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-700 font-mono text-sm overflow-auto">
                  <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                    {feed.codeSnippet}
                  </SyntaxHighlighter>
                </div>
              )}
              {feed.image && (
                <div className="mb-4">
                  <img
                    src={feed.image}
                    alt="Feed"
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
              )}

              {feed.video && (
                <div className="mb-4">
                  <video controls className="rounded-lg max-w-full h-auto">
                    <source src={feed.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              <div className="flex items-center space-x-2 mt-4">
                <button
                  onClick={() => onLike(feed._id)}
                  className="flex items-center space-x-1 text-neutral-400 hover:text-red-500 transition-colors"
                >
                  {feed.likes?.includes(userId) ? (
                    <Heart className="text-red-500 fill-red-500" size={20} />
                  ) : (
                    <HeartOff size={20} />
                  )}
                  <span>{feed.likes?.length || 0}</span>
                </button>
              </div>
              {feed.githubLink && (
                <div className="flex justify-end mt-4">
                  <a
                    href={feed.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-700 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    View on GitHub
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedList;
