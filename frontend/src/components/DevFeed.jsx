import React, { useState, useEffect } from "react";
import FeedForm from "./FeedForm";
import FeedList from "./FeedDisplay";
import { backendUrl } from "../constanst";

const DevFeed = () => {
  const [feeds, setFeeds] = useState([]);

  const fetchFeeds = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/feed`);
      const result = await response.json(); 
      setFeeds(result.data); 
    } catch (error) {
      console.error("Error fetching feeds:", error);
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server responded with an error:", errorText);
      return;
    }

    const data = await response.json();
    console.log("Like updated:", data);

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
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server responded with an error:", errorText);
        return;
      }
  
      const data = await response.json();
      console.log("Feed created:", data);
  
      fetchFeeds();
    } catch (error) {
      console.error("Error creating feed:", error);
    }
  };

  return (
    <>
      <div className="text-center mb-16 pt-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
          Developer <span className="text-purple-500">Social Feed</span>
        </h2>
        <p className="text-neutral-400 max-w-3xl mx-auto">
          Connect with like-minded developers, share your projects, participate
          in technical discussions, and stay updated with the latest in tech.
        </p>
      </div>

      <div className="max-w-4xl mx-auto pb-8">
        <div className="bg-neutral-800 rounded-t-xl p-4 border border-neutral-700 flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-1">
            <button className="bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              All Feeds
            </button>
            <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
              Projects
            </button>
            <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
              Teams
            </button>
            <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
              Discussions
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search feeds..."
              className="bg-neutral-900 text-white pl-10 pr-4 py-2 rounded-lg border border-neutral-700 focus:border-purple-500 focus:outline-none w-full md:w-auto"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-neutral-400 absolute left-3 top-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <FeedForm onSubmit={handleFeedSubmit} />

        <FeedList feeds={feeds} onLike={handleLike} />
      </div>
    </>
  );
};

export default DevFeed;