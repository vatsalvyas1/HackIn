import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { backendUrl } from "../constanst.js";
import {
  UserRoundIcon,
  Globe,
  Mail,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

const SponsorDetails = () => {
  const { id } = useParams();
  const [sponsor, setSponsor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myHackathons, setMyHackathons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    hackathonId: "",
    message: "",
  });
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${backendUrl}/api/v1/sponsors/create-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hackathonId: formData.hackathonId,
            message: formData.message,
            sponsorId: id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send sponsorship request");
      }

      window.alert("Sponsorship request sent successfully!");
      setShowModal(false);
      setFormData({
        hackathonId: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending sponsorship request:", error);
    }
  };

  const handleAccept = async (hackathonId) => {
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/sponsors/accept-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hackathonId,
            sponsorId: id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept sponsorship request");
      }

      window.alert("Sponsorship request accepted successfully!");
    } catch (error) {
      console.error("Error accepting sponsorship request:", error);
    }
  };

  const handelReject = async(hackathonId) => {
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/sponsors/reject-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hackathonId,
            sponsorId: id,
          }),
        });

      if (!response.ok) {
        throw new Error("Failed to reject sponsorship request");
      }
      
      window.alert("Sponsorship request rejected successfully!");
    } catch (error) {
      console.error("Error rejecting sponsorship request:", error);
    }
  }; 

  useEffect(() => {
    const fetchSponsorDetails = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/v1/sponsors/${id}`);
        if (!response.ok) throw new Error("Failed to fetch sponsor details");
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
        const response = await fetch(
          `${backendUrl}/api/v1/hackathon/get-my-hackathons`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          }
        );
        if (!response.ok) throw new Error("Failed to fetch hackathons");
        const data = await response.json();
        setMyHackathons(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSponsorDetails();
    fetchMyHackathons();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
          <p className="text-neutral-300 font-medium">
            Loading sponsor details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <p className="text-red-400 font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!sponsor) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="w-12 h-12 text-neutral-500" />
          <p className="text-neutral-300 font-medium">Sponsor not found</p>
        </div>
      </div>
    );
  }

  const getTierStyles = (tier) => {
    switch (tier) {
      case "Platinum":
        return "bg-gradient-to-r from-purple-900/50 to-purple-700/50 text-purple-200 border-purple-500/30";
      case "Gold":
        return "bg-gradient-to-r from-yellow-900/50 to-yellow-700/50 text-yellow-200 border-yellow-500/30";
      default:
        return "bg-gradient-to-r from-neutral-900/50 to-neutral-700/50 text-neutral-200 border-neutral-500/30";
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "rejected":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      default:
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <CheckCircle2 className="w-5 h-5" />;
      case "rejected":
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-neutral-900/30 backdrop-blur-lg"
            onClick={() => setShowModal(false)}
          />

          <div className="relative bg-neutral-800 rounded-xl p-6 w-full max-w-md border border-purple-700/50 z-10">
            <h2 className="text-2xl font-bold text-white mb-4">
              Sponsorship Request
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <h3 className="text-neutral-300 mb-2">Sponsor:</h3>
                <p className="text-white">{sponsor.name}</p>
              </div>

              <div>
                <h3 className="text-neutral-300 mb-2">Hackathon:</h3>
                <select
                  className="w-full bg-neutral-700 border border-neutral-600 rounded-md px-4 py-2 text-white"
                  value={formData.hackathonId}
                  onChange={(e) =>
                    setFormData({ ...formData, hackathonId: e.target.value })
                  }
                >
                  <option>Select a hackathon</option>
                  {myHackathons.map((hackathon) => (
                    <option key={hackathon._id} value={hackathon._id}>
                      {hackathon.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="text-neutral-300 mb-2">Message:</h3>
                <textarea
                  className="w-full bg-neutral-700 border border-neutral-600 rounded-md px-4 py-2 text-white"
                  rows="4"
                  placeholder="Enter your sponsorship request message..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-neutral-600 hover:bg-neutral-500 rounded-lg transition-colors duration-300 text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg transition-colors duration-300 text-white font-semibold"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
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
            {userId !== sponsor.user._id && (
               <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  Send Request for Sponsorship
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sponsorship Requests Section */}
        {userId === sponsor.user._id &&
          sponsor.sponsorshipRequests.length > 0 && (
            <div className="mt-8 bg-neutral-900/80 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Sponsorship Requests
                </h2>
                {/* <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="text-sm text-neutral-400">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-sm text-neutral-400">Accepted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-sm text-neutral-400">Rejected</span>
                </div>
              </div> */}
              </div>

              <div className="grid gap-4">
                {sponsor.sponsorshipRequests.map((request, index) => (
                  <div
                    key={index}
                    className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50 hover:border-purple-500/30 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="">
                            <h3
                              className="text-lg hover:text-purple-400 transition-colors duration-200 font-medium text-white cursor-pointer"
                              onClick={() => {
                                navigate(`/hackathon/${request.hackathon._id}`);
                              }}
                            >
                              {request.hackathon.name}
                            </h3>
                          </div>
                        </div>

                        <p className="text-neutral-300 leading-relaxed">
                          {request.message}
                        </p>

                        
                          <div className="flex items-center gap-3 pt-4">
                            <button
                              onClick={() =>
                                handleAccept(request.hackathon._id)
                              }
                              className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600 border border-green-500/30 rounded-lg text-green-400 hover:text-white font-medium transition-all duration-200"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handelReject(request.hackathon._id)
                              }
                              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600 border border-red-500/30 rounded-lg text-red-400 hover:text-white font-medium transition-all duration-200"
                            >
                              <XCircle className="w-4 h-4" />
                              Reject
                            </button>
                          </div>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default SponsorDetails;
