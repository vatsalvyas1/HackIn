import { logout } from "../firebase";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Pencil, Github, Linkedin, Plus } from "lucide-react";

export default function DashBoard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/users/get-profile/${userId}`,
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
          `http://localhost:3000/api/v1/project/user/${userId}`,
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

    fetchUserProfile();
    fetchUserProjects();
  }, []); // Runs once when the component mounts

  const handleLogout = async () => {
    await logout();
    setUser(null);
    localStorage.removeItem("user");

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="mx-1 md:mx-16 pt-8 px-4 text-white pb-20">
      {user ? (
        <div className="border border-neutral-700 bg-neutral-800 rounded-md">
          <div className="bg-neutral-900 border-b border-neutral-700 p-4 flex flex-col md:flex-row md:justify-between">
            <div className="flex gap-4 items-center">
              <img
                src={user.profileImage}
                alt="profile"
                className="w-10 h-10 md:w-16 md:h-16 rounded-full"
              />
              <div>
                <h3 className="md:text-xl">{user.name}</h3>
                <p className="text-sm md:text-base text-neutral-400">
                  {user.bio}
                </p>
                <div className="flex gap-2">
                  {user.username && (
                    <a
                      href={`https://github.com/${user.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-neutral-600 rounded-full p-1"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {user.socialLinks?.linkedin && (
                    <a
                      className="bg-neutral-600 rounded-full p-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={user.socialLinks.linkedin}
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <span className="bg-purple-900/30 text-purple-400 px-3 py-1 text-sm md:text-base rounded-full font-medium mr-2">
                {user.contributionScore} 🏆
              </span>

              <Link
                to="/add-project"
                className="bg-purple-600 hover:bg-purple-500 hover:-translate-y-1 px-2 py-1 rounded-md transition-all duration-300 mr-2 flex items-center gap-1"
              >
                <Plus size={18} />
              </Link>

              <Link
                to="/edit-profile"
                className="bg-purple-600 hover:bg-purple-500 hover:-translate-y-1 px-2 py-1 rounded-md transition-all duration-300 mr-2 flex items-center gap-1"
              >
                <Pencil size={18} />
              </Link>

              <button
                onClick={handleLogout}
                className="bg-purple-600 hover:bg-purple-500 hover:-translate-y-1 px-2 py-1 rounded-md transition-all duration-300 cursor:pointer"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-2">
            <h3>Skill Set</h3>
            <ul>
              {user.skills.map((skill, index) => (
                <li key={index} className="bg-neutral-900 p-2 rounded-md mb-2">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Display User Projects */}
          <div className="p-4 space-y-2">
            <h3>Your Projects</h3>
            {projects.length > 0 ? (
              <ul>
                {projects.map((project) => (
                  <li
                    key={project._id}
                    className="bg-neutral-900 p-4 rounded-md mb-2"
                  >
                    <Link
                      to={`/project/${project._id}`}
                      className="block bg-neutral-900 p-4 rounded-md mb-2 hover:bg-neutral-700 transition"
                    >
                      <h4 className="text-lg font-semibold">
                        {project.projectTitle}
                      </h4>
                      <p className="text-neutral-400">{project.description}</p>
                      <div className="flex gap-2 mt-2">
                        {project.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Project ${index + 1}`}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-neutral-400">No projects found.</p>
            )}
          </div>
        </div>
      ) : (
        <div>Log In first</div>
      )}
    </div>
  );
}
