import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { backendUrl } from "../constanst.js";
import { UserRoundIcon } from "lucide-react";

const SponsorDetails = () => {
  const { id } = useParams();
  const [sponsor, setSponsor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myHackathons, setMyHackathons] = useState([]);

  useEffect(() => {
    const fetchSponsorDetails = async () => {
      console.log("Fetching sponsor details...");
      try {
        const response = await fetch(`${backendUrl}/api/v1/sponsors/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch sponsor details");
        }

        const data = await response.json();
        setSponsor(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user ? user._id : null;
    const fetchMyHackathons = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/v1/hackathon/get-my-hackathons`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body : JSON.stringify({
            userId
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch hackathons");
        }

        const data = await response.json();
        setMyHackathons(data.data);
      } catch (err) {
        setError(err.message);
      }
    };  

    fetchSponsorDetails();
    fetchMyHackathons();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-8 text-neutral-300 font-mono">
        Loading sponsor details...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-8 text-red-400 font-mono">
        Error: {error}
      </div>
    );
  if (!sponsor)
    return (
      <div className="text-center py-8 text-neutral-300 font-mono">
        Sponsor not found
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-700/50">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <img
              src={sponsor.logo}
              alt={`${sponsor.name} logo`}
              className="h-40 w-40 object-contain rounded-lg"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-white font-mono">
                {sponsor.name}
              </h1>
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  sponsor.tier === "Platinum"
                    ? "bg-purple-700/50 text-purple-200"
                    : sponsor.tier === "Gold"
                    ? "bg-yellow-700/50 text-yellow-200"
                    : "bg-neutral-700/50 text-neutral-200"
                }`}
              >
                {sponsor.tier} Tier
              </span>
            </div>

            <p className="text-neutral-300 mb-6">{sponsor.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-neutral-400 font-mono mb-2">Website</h3>
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:underline break-all"
                >
                  {sponsor.website}
                </a>
              </div>

              <div>
                <h3 className="text-neutral-400 font-mono mb-2">Contact</h3>
                <a
                  href={`mailto:${sponsor.contactEmail}`}
                  className="text-purple-400 hover:underline break-all"
                >
                  {sponsor.contactEmail}
                </a>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
              >
                Send Request for Sponsorship
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorDetails;
