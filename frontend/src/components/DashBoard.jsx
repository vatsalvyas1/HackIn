import { logout } from "../firebase";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { LogOut, Pencil, Github, Linkedin, Plus } from "lucide-react";
import { backendUrl } from "../constanst";

export default function DashBoard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const userId =
    location.state?.userId || JSON.parse(localStorage.getItem("user"))._id;
  const loggedInUserId = JSON.parse(localStorage.getItem("user"))._id;
  const isLoggedInUser = userId === loggedInUserId;
  const [teams, setTeams] = useState([]);
  const githubUsername = user?.username;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/api/v1/users/get-profile/${userId}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const result = await response.json();
        setUser(result.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchUserProjects = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/api/v1/project/user/${userId}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch projects");
        }

        const result = await response.json();
        setProjects(result.data);
      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
    };

    const fetchUserTeams = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/v1/team/get-all`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const result = await response.json();

        const userTeams = result.data.filter((team) =>
          team.teamMembers.map((member) => member._id).includes(userId)
        );
        setTeams(userTeams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchUserProfile();
    fetchUserProjects();
    fetchUserTeams();
  }, [userId]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const colorCss = {
    1: "bg-purple-600",
    2: "bg-indigo-600",
    3: "bg-green-600",
    4: "bg-red-600",
    5: "bg-blue-600",
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const formattedStart = start.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });
    const formattedEnd = end.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });
    const year = start.getFullYear();

    return `${formattedStart}-${formattedEnd}, ${year}`;
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {user ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg border border-neutral-700">
            {/* Profile Header */}
            <div className="relative bg-neutral-900 p-8 border-b border-neutral-700">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={user.profileImage}
                      alt="profile"
                      className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-4 border-purple-500/20"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-purple-500 text-xs font-medium px-2 py-1 rounded-full shadow-lg">
                      {user.contributionScore} 🏆
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                      {user.name}
                    </h1>
                    <p className="text-neutral-400 max-w-lg">{user.bio}</p>
                    <div className="flex gap-3">
                      {user.username && (
                        <a
                          href={`https://github.com/${user.username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-neutral-700/50 hover:bg-neutral-600/50 p-2 rounded-xl transition-all duration-300"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {user.socialLinks?.linkedin && (
                        <a
                          href={user.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-neutral-700/50 hover:bg-neutral-600/50 p-2 rounded-xl transition-all duration-300"
                        >
                          <Linkedin size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isLoggedInUser && (
                    <>
                      <Link
                        to="/edit-profile"
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-xl transition-all duration-300"
                      >
                        <Pencil size={18} />
                        <span>Edit Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-xl transition-all duration-300"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {githubUsername && (
              <div className="p-8 border-t border-neutral-700/50">
                <h2 className="text-xl font-semibold mb-4">
                  GitHub Contributions
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&theme=midnight-purple&show_icons=true`}
                    alt="GitHub Stats"
                    className="w-full md:w-1/2 h-auto rounded-xl border border-neutral-700"
                    onError={(e) => {
                      e.target.style.display = "none"; 
                    }}
                  />
                  <img
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=midnight-purple`}
                    alt="GitHub Streak"
                    className="w-full md:w-1/2 h-auto rounded-xl border border-neutral-700"
                    onError={(e) => {
                      e.target.style.display = "none"; 
                    }}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <a
                    href={`https://github.com/${githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
                  >
                    View full GitHub profile <span>→</span>
                  </a>
                </div>
              </div>
            )}

            {/* Skills Section */}
            <div className="p-8 border-t border-neutral-700/50">
              <h2 className="text-xl font-semibold mb-4">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-900/30 text-purple-300 ring ring-purple-800 rounded-full text-sm font-medium hover:bg-purple-900/60 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Teams Section */}
            <div className="p-8 border-t border-neutral-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Active Teams</h2>
                <Link
                  to="/teams"
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
                >
                  View All Teams
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teams.map((team) => (
                  <div
                    key={team._id}
                    className="group bg-neutral-800/30 rounded-2xl p-6 border border-neutral-700 hover:border-purple-500 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold ${
                            colorCss[Math.floor(Math.random() * 5) + 1]
                          }`}
                        >
                          {team.teamName.split(" ").map((item) => item[0])}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-purple-400 transition-colors duration-300">
                            {team.teamName}
                          </h3>
                          <p className="text-neutral-400 text-sm">
                            Global Rank: #128
                          </p>
                        </div>
                      </div>
                      <div className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                        {team.teamScore} 🏆
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center text-sm text-neutral-400 gap-1">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{team.hackathonName}</span>
                        </div>
                        <span className="block">
                          {formatDateRange(
                            team.dates.startDate,
                            team.dates.endDate
                          )}
                        </span>
                      </div>

                      <div>
                        {/* <div className="h-2 w-full bg-neutral-700/30 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-600 rounded-full" style={{width: "100%"}} />
                        </div> */}
                        <p className="text-neutral-400 text-sm mt-2">
                          Team Size:{" "}
                          <span className="text-white">{team.teamSize}</span>
                        </p>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex -space-x-3">
                          {team.teamMembers.map((member, index) => (
                            <img
                              key={index}
                              src={member.profileImage}
                              alt=""
                              className="w-8 h-8 rounded-full border border-neutral-800"
                            />
                          ))}
                        </div>
                        <Link
                          to={`/team/${team._id}`}
                          className={`px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity duration-300 bg-purple-600`}
                        >
                          Team Space
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div className="p-8 border-t border-neutral-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Projects Showcase</h2>
                {isLoggedInUser && (
                  <Link
                    to="/add-project"
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-300"
                  >
                    <Plus size={18} />
                    <span>Add Project</span>
                  </Link>
                )}
              </div>

              {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <Link
                      to={`/project/${project._id}`}
                      key={project._id}
                      className="group block"
                    >
                      <div className="bg-neutral-800/30 rounded-2xl overflow-hidden border border-neutral-700 group-hover:border-purple-500 transition-all duration-300">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={project.images[0]}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="p-6 space-y-4">
                          <p className="text-neutral-300 line-clamp-2">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-neutral-700/30 text-neutral-400 text-xs rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <span className="text-neutral-500 text-sm">
                              {project.hackathonName}
                            </span>
                            <span className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                              View Project →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-neutral-800/30 rounded-2xl border border-neutral-700/50">
                  <p className="text-neutral-400">No projects found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-8 bg-neutral-800/50 rounded-2xl border border-neutral-700/50">
            <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
            <p className="text-neutral-400">
              Please log in to view this profile.
            </p>
            <Link
              to="/login"
              className="mt-4 inline-block px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-500 transition-colors duration-300"
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
