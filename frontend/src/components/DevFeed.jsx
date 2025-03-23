import React, { useState, useEffect } from "react";
import { Search, Filter, TrendingUp, Users, MessageSquare } from "lucide-react";
import clsx from "clsx";
import FeedForm from "./FeedForm";
import FeedList from "./FeedDisplay";
import { backendUrl } from "../constanst";

// const backendUrl = "http://localhost:3000";

const FeedTypeButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={clsx(
      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
      active
        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
        : "bg-neutral-700/30 text-neutral-300 hover:bg-neutral-700/50 hover:text-white"
    )}
  >
    {children}
  </button>
);

const DevFeed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFeeds = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/v1/feed`);
      const result = await response.json();
      setFeeds(result.data);
    } catch (error) {
      console.error("Error fetching feeds:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  const handleLike = async (feedId) => {
    const storedUser = localStorage.getItem("user");
    const userId = JSON.parse(storedUser)?._id;

    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/v1/feed/${feedId}/like`, {
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
          feed._id === feedId ? { ...feed, likes: data.likes } : feed
        )
      );
    } catch (error) {
      console.error("Error liking feed:", error);
    }
  };

  const handleFeedSubmit = async (formData) => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/feed`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(await response.text());

      await fetchFeeds();
    } catch (error) {
      console.error("Error creating feed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-neutral-900 to-neutral-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4 font-mono">
            Developer Social Feed
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            Connect with developers, share projects, and join technical discussions
            in our growing community.
          </p>
        </div>

        <div className="bg-neutral-800/50 backdrop-blur-sm rounded-lg border border-neutral-700/50 p-4 mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <FeedTypeButton
                active={activeTab === "all"}
                onClick={() => setActiveTab("all")}
              >
                <TrendingUp size={16} className="inline mr-2" />
                All Feeds
              </FeedTypeButton>
              <FeedTypeButton
                active={activeTab === "projects"}
                onClick={() => setActiveTab("projects")}
              >
                <Filter size={16} className="inline mr-2" />
                Projects
              </FeedTypeButton>
              <FeedTypeButton
                active={activeTab === "teams"}
                onClick={() => setActiveTab("teams")}
              >
                <Users size={16} className="inline mr-2" />
                Teams
              </FeedTypeButton>
              <FeedTypeButton
                active={activeTab === "discussions"}
                onClick={() => setActiveTab("discussions")}
              >
                <MessageSquare size={16} className="inline mr-2" />
                Discussions
              </FeedTypeButton>
            </div>

            <div className="relative flex-shrink-0">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search feeds..."
                className="w-full md:w-64 bg-neutral-900/50 text-white pl-10 pr-4 py-2 rounded-lg border border-neutral-700/50 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <FeedForm onSubmit={handleFeedSubmit} />

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
              <p className="text-neutral-400 mt-4">Loading feeds...</p>
            </div>
          ) : (
            <FeedList feeds={feeds} onLike={handleLike} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DevFeed;