import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  Award,
  MapPin,
  Link,
  Info,
  Building2,
  ShieldCheck,
  Loader2,
  Code,
  Bot,
  ScanEye,
  Database,
  LayoutTemplate,
  FileLock2,
  MonitorSmartphone,
  Cloud,
  BookOpen,
} from "lucide-react";
import { backendUrl } from "../constanst";
import { format } from "date-fns";

export default function HackathonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [participatingTeams, setParticipatingTeams] = useState([]);

  useEffect(() => {
    const fetchHackathonDetails = async () => {
      try {
        console.log(id);
        const response = await fetch(
          `${backendUrl}/api/v1/hackathon/get-hackathon/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch hackathon details");
        }
        const result = await response.json();
        setHackathon(result.data);
        // setParticipatingTeams(data.hackathon.participants);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathonDetails();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy 'at' h:mm a");
  };

  const bg = {
    "bg-gradient-to-r from-blue-900 to-purple-900": "bg-gradient-to-r from-blue-900 to-purple-900",
    "bg-gradient-to-r from-green-900 to-teal-900": "bg-gradient-to-r from-green-900 to-teal-900",
    "bg-gradient-to-r from-red-900 to-orange-900": "bg-gradient-to-r from-red-900 to-orange-900",
    "bg-gradient-to-r from-indigo-900 to-blue-900": "bg-gradient-to-r from-indigo-900 to-blue-900",
    "bg-gradient-to-r from-purple-900 to-pink-900": "bg-gradient-to-r from-purple-900 to-pink-900",
    "bg-gradient-to-r from-yellow-900 to-amber-900": "bg-gradient-to-r from-yellow-900 to-amber-900",
  };

  const logobg = {
    "bg-gradient-to-r from-blue-900 to-purple-900": "bg-gradient-to-r from-blue-600 to-purple-600",
    "bg-gradient-to-r from-green-900 to-teal-900": "bg-gradient-to-r from-green-600 to-teal-600",
    "bg-gradient-to-r from-red-900 to-orange-900": "bg-gradient-to-r from-red-600 to-orange-600",
    "bg-gradient-to-r from-indigo-900 to-blue-900": "bg-gradient-to-r from-indigo-600 to-blue-600",
    "bg-gradient-to-r from-purple-900 to-pink-900": "bg-gradient-to-r from-purple-600 to-pink-600",
    "bg-gradient-to-r from-yellow-900 to-amber-900": "bg-gradient-to-r from-yellow-600 to-amber-600",
  };

  const logo = {
    "Web3": <Code />,
    "AI": <Bot />,
    "AR/VR": <ScanEye />,
    "Data & Gen AI": <Database />,
    "IOT": <LayoutTemplate />,
    "Cyber Securtiy": <FileLock2 />,
    "Web & App Development": <MonitorSmartphone />,
    "Cloud & DevOps": <Cloud />,
    "Open Innovation": <BookOpen />,
  };


  return (
    <div className="mx-1 md:mx-16 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      {hackathon && (
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 shadow-xl overflow-hidden">
          <div className="relative">
            <div className={`absolute inset-0 ${bg[hackathon.colorTheme]}`} />
            <div className="relative bg-neutral-900/80 backdrop-blur-sm border-b border-neutral-700 p-6 sm:p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div
                  className={`h-20 w-20 rounded-2xl font-bold text-3xl flex items-center justify-center shadow-lg text-white ${logobg[hackathon.colorTheme]}`}
                >
                  {logo[hackathon.track]}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {hackathon.name}
                  </h1>
                  <div className="flex items-center gap-3 text-neutral-400">
                    <Building2 className="w-4 h-4" />
                    <span>{hackathon.collegeRepresenting}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                    <ShieldCheck className="w-4 h-4 text-blue-500" />
                    <span>{hackathon.track}</span>
                  </div>
                </div>
              </div>
              <div className="text-white">
                <span className="text-md font-bold bg-neutral-800 px-4 py-2 rounded-full border border-neutral-700 text-white">
                  ₹ {hackathon?.prizePool?.toLocaleString() || "0"} Prize Pool{" "}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 px-6 py-3 border-b border-neutral-700 flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-300 ${
                activeTab === "overview"
                  ? "text-white border-b-2 border-purple-600"
                  : "text-neutral-400 hover:text-white border-b-2 border-transparent hover:border-neutral-700"
              }`}
            >
              <Info className="w-4 h-4" />
              Overview
            </button>

            <button
              onClick={() => setActiveTab("schedule")}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-300 ${
                activeTab === "schedule"
                  ? "text-white border-b-2 border-purple-600"
                  : "text-neutral-400 hover:text-white border-b-2 border-transparent hover:border-neutral-700"
              }`}
            >
              <Calendar className="w-4 h-4" />
              Schedule
            </button>

            <button
              onClick={() => setActiveTab("teams")}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-300 ${
                activeTab === "teams"
                  ? "text-white border-b-2 border-purple-600"
                  : "text-neutral-400 hover:text-white border-b-2 border-transparent hover:border-neutral-700"
              }`}
            >
              <Users className="w-4 h-4" />
              Participating Teams ({hackathon?.participants?.length || 0})
            </button>

            <button
              onClick={() => setActiveTab("prizes")}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-300 ${
                activeTab === "prizes"
                  ? "text-white border-b-2 border-purple-600"
                  : "text-neutral-400 hover:text-white border-b-2 border-transparent hover:border-neutral-700"
              }`}
            >
              <Award className="w-4 h-4" />
              Prizes
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-white mb-3">
                    Description
                  </h2>
                  <p className="text-neutral-300 leading-relaxed">
                    {hackathon.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-700">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Location
                    </h3>
                    <div className="text-neutral-300 space-y-1">
                      <p>
                        {hackathon?.location?.address ||
                          "Address not available"}
                      </p>
                      <p>
                        ({hackathon?.location?.city || 0}), (
                        {hackathon?.location?.state || 0})
                      </p>
                      <p>{hackathon?.location?.country || 0}</p>
                      <p className="mt-2 text-purple-300">
                        Mode:{" "}
                        <span className="font-medium">{hackathon.mode}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-700">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Important Dates
                    </h3>
                    <div className="text-neutral-300 space-y-2">
                      <p>
                        <span className="font-medium">Starts:</span>{" "}
                        {hackathon?.startDate
                          ? formatDateTime(hackathon.startDate)
                          : "Not available"}
                      </p>
                      <p>
                        <span className="font-medium">Ends:</span>{" "}
                        {hackathon?.endDate
                          ? formatDateTime(hackathon.endDate)
                          : "Not available"}
                      </p>
                      <p>
                        <span className="font-medium">
                          Registration Deadline:
                        </span>{" "}
                        {hackathon?.registrationDeadline
                          ? formatDateTime(hackathon.registrationDeadline)
                          : "Not available"}
                      </p> 
                    </div>
                  </div>

                  {hackathon.website && (
                    <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-700">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Link className="w-5 h-5" />
                        Links
                      </h3>
                      <a
                        href={hackathon.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 underline"
                      >
                        Official Website
                      </a>
                    </div>
                  )}

                  {hackathon.sponsors && hackathon.sponsors.length > 0 && (
                    <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-700">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Sponsors
                      </h3>
                      <div className="flex flex-wrap gap-4">
                        {hackathon.sponsors.map((sponsor, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-neutral-800 px-3 py-2 rounded-md"
                          >
                            {sponsor.logo ? (
                              <img
                                src={sponsor.logo}
                                alt={sponsor.name}
                                className="h-8 object-contain"
                              />
                            ) : (
                              <span className="text-neutral-300">
                                {sponsor.name}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-center mt-6">
                <button
                  onClick={() => navigate(`/hackathon/${id}/apply`)}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">Join This Hackathon</button>
                  </div>
              </div>
            )}

            {activeTab === "schedule" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6">Schedule</h2>
                <div className="bg-neutral-900 rounded-lg border border-neutral-700 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6 border-b md:border-b-0 md:border-r border-neutral-700">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Event Timeline
                      </h3>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-purple-600 mt-1" />
                            <div className="w-0.5 h-full bg-purple-600/50" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">
                              Registration Opens
                            </h4>
                            <p className="text-sm text-neutral-400">
                              {formatDate(hackathon.startDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-0.5 h-4 bg-purple-600/50" />
                            <div className="w-3 h-3 rounded-full bg-purple-600" />
                            <div className="w-0.5 h-full bg-purple-600/50" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">
                              Registration Deadline
                            </h4>
                            <p className="text-sm text-neutral-400">
                              {formatDate(hackathon.registrationDeadline)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-0.5 h-4 bg-purple-600/50" />
                            <div className="w-3 h-3 rounded-full bg-purple-600" />
                            <div className="w-0.5 h-full bg-purple-600/50" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">
                              Hackathon Begins
                            </h4>
                            <p className="text-sm text-neutral-400">
                              {formatDateTime(hackathon.startDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-0.5 h-4 bg-purple-600/50" />
                            <div className="w-3 h-3 rounded-full bg-purple-600" />
                            <div className="w-0.5 h-4 bg-purple-600/50" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">
                              Submission Deadline
                            </h4>
                            <p className="text-sm text-neutral-400">
                              {formatDateTime(hackathon.endDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-0.5 h-4 bg-purple-600/50" />
                            <div className="w-3 h-3 rounded-full bg-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">
                              Winners Announced
                            </h4>
                            <p className="text-sm text-neutral-400">
                              Shortly after judging
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Team Requirements
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-neutral-300">
                          <Users className="w-5 h-5 text-purple-500" />
                          <span>
                            Team size: {hackathon.minTeamSize} -{" "}
                            {hackathon.maxTeamSize} members
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-300">
                          <ShieldCheck className="w-5 h-5 text-purple-500" />
                          <span>Track: {hackathon.track}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "teams" && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">
                  Participating Teams ({hackathon.participants.length})
                </h2>
                {participatingTeams.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {participatingTeams.map((team, index) => (
                      <div
                        key={index}
                        onClick={() => navigate(`/team/${team._id}`)}
                        className="group bg-neutral-900 rounded-lg p-4 border border-neutral-700 hover:border-purple-600 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl font-bold text-xl flex items-center justify-center shadow-lg text-white">
                            {team.teamName
                              .split(" ")
                              .map((item) => item[0])
                              .join("")}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">
                              {team.teamName}
                            </h3>
                            <div className="flex items-center gap-2 text-neutral-400 text-sm">
                              <MapPin className="w-3 h-3" />
                              <span>{team.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {team.skills.slice(0, 3).map((skill, idx) => (
                            <span
                              key={idx}
                              className="bg-purple-900/40 text-purple-300 border border-purple-800 px-2 py-0.5 rounded-full text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                          {team.skills.length > 3 && (
                            <span className="bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full text-xs font-medium">
                              +{team.skills.length - 3} more
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-400">
                            {team.teamMembers.length} members
                          </span>
                          <span className="text-sm font-medium text-purple-400">
                            Score: {team.teamScore || "N/A"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-neutral-400">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No teams registered yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "prizes" && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-white mb-6">Prizes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-b from-yellow-600/20 to-yellow-900/10 border border-yellow-700/50 rounded-xl p-6 text-center">
                    <div className="mx-auto w-16 h-16 bg-yellow-600/20 rounded-full flex items-center justify-center mb-4 border-2 border-yellow-600/50">
                      <Award className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold text-yellow-300 mb-2">
                      1st Place
                    </h3>
                    <p className="text-2xl font-bold text-white mb-3">
                    ₹{hackathon.prizes.first.toLocaleString()}
                    </p>
                    {hackathon.winner?.first && (
                      <div className="mt-4 pt-4 border-t border-yellow-700/50">
                        <p className="text-sm text-yellow-300 mb-2">Winner:</p>
                        <p className="text-white font-medium">
                          {
                            participatingTeams.find(
                              (t) => t._id === hackathon.winner.first
                            )?.teamName
                          }
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="bg-gradient-to-b from-gray-500/20 to-gray-800/10 border border-gray-700/50 rounded-xl p-6 text-center">
                    <div className="mx-auto w-16 h-16 bg-gray-600/20 rounded-full flex items-center justify-center mb-4 border-2 border-gray-600/50">
                      <Award className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-300 mb-2">
                      2nd Place
                    </h3>
                    <p className="text-2xl font-bold text-white mb-3">
                    ₹{hackathon.prizes.second.toLocaleString()}
                    </p>
                    {hackathon.winner?.second && (
                      <div className="mt-4 pt-4 border-t border-gray-700/50">
                        <p className="text-sm text-gray-300 mb-2">Winner:</p>
                        <p className="text-white font-medium">
                          {
                            participatingTeams.find(
                              (t) => t._id === hackathon.winner.second
                            )?.teamName
                          }
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="bg-gradient-to-b from-amber-700/20 to-amber-900/10 border border-amber-700/50 rounded-xl p-6 text-center">
                    <div className="mx-auto w-16 h-16 bg-amber-600/20 rounded-full flex items-center justify-center mb-4 border-2 border-amber-600/50">
                      <Award className="w-8 h-8 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-300 mb-2">
                      3rd Place
                    </h3>
                    <p className="text-2xl font-bold text-white mb-3">
                    ₹{hackathon.prizes.third.toLocaleString()}
                    </p>
                    {hackathon.winner?.third && (
                      <div className="mt-4 pt-4 border-t border-amber-700/50">
                        <p className="text-sm text-amber-300 mb-2">Winner:</p>
                        <p className="text-white font-medium">
                          {
                            participatingTeams.find(
                              (t) => t._id === hackathon.winner.third
                            )?.teamName
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {hackathon.sponsors && hackathon.sponsors.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Sponsor Prizes
                    </h3>
                    <div className="bg-neutral-900 rounded-lg border border-neutral-700 p-6">
                      <p className="text-neutral-300">
                        Additional prizes may be awarded by sponsors for
                        specific categories or achievements.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
