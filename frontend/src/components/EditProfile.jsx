import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [addedSkills, setAddedSkills] = useState([]);
  const [profileData, setProfileData] = useState({
    bio: "",
    linkedin: "",
    portfolio: "",
  });
  const [skills, setSkills] = useState([
    "HTML",
    "CSS",
    "REACT",
    "JAVASCRIPT",
    "NEXTJS",
    "BLOCKCHAIN",
    "AI",
    "DOCKER",
  ]);

  function addSkill(skill) {
    setAddedSkills((prevSkills) => [...prevSkills, skill]);

    setSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  }

  function removeSkill(skill) {
    setAddedSkills((prevSkills) => prevSkills.filter((s) => s !== skill));

    setSkills((prevSkills) => [...prevSkills, skill]);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      console.error("User not found");
      navigate("/");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/complete-profile",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            bio: profileData.bio,
            skills: addedSkills,
            socialLinks: {
              linkedin: profileData.linkedin,
              portfolio: profileData.portfolio,
            },
          }),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        updatedUser.user.firstLogin = false;
        localStorage.setItem("user", JSON.stringify(updatedUser.user));

        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        console.error("Profile update failed:", errorData);
        alert(errorData.message || "Profile update failed");
      }
    } catch (error) {
      console.error("Profile update error:", error);
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="mx-1 md:mx-16 px-4 text-white pt-8 pb-20">
      {user && (
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <div className="space-y-4 bg-neutral-800 p-4 rounded-lg border border-neutral-700">
            <img
              src={user.profileImage}
              alt=""
              className="h-16 w-16 rounded-full"
            />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-neutral-800 p-4 rounded-lg border border-neutral-700 flex-grow"
          >
            <div className="space-x-2">
              <label htmlFor="bio">Bio : </label>
              <input
                type="text"
                name="bio"
                required
                value={profileData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                className="flex-grow bg-neutral-800 border border-neutral-700 rounded-lg py-1 px-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-neutral-500"
              />
            </div>

            <div className="space-x-2">
              <label htmlFor="linkedin">LinkedIn Link :</label>
              <input
                type="url"
                name="linkedin"
                required
                value={profileData.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn Profile Link"
                className="flex-grow bg-neutral-800 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-neutral-500"
              />
            </div>

            <div className="space-x-2">
              <label htmlFor="portfolio">Portfolio Link :</label>
              <input
                type="text"
                name="portfolio"
                value={profileData.portfolio}
                onChange={handleChange}
                placeholder="Portfolio link (if any)"
                className="flex-grow bg-neutral-800 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-neutral-500"
              />
            </div>

            <div>
              <h5>Add skills</h5>
              {addedSkills.length > 0 && (
                <ul className="flex gap-2 flex-wrap mt-2">
                  {addedSkills.map((skill) => (
                    <button
                      type="button"
                      key={skill}
                      className="bg-purple-900/30 text-purple-400 border border-neutral-700 px-2 py-1 text-sm flex gap-2 items-center rounded-full font-mono hover:bg-purple-900/80 transition-color duration-300"
                      onClick={() => removeSkill(skill)}
                    >
                      {skill} <X size={18} />
                    </button>
                  ))}
                </ul>
              )}

              <ul className="flex gap-2 flex-wrap mt-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-neutral-900 border border-neutral-700 px-3 py-1 text-sm flex gap-2 items-center rounded-full font-mono cursor-pointer hover:bg-neutral-700 transition-color duration-300"
                    onClick={() => addSkill(skill)}
                  >
                    {skill} <Plus size={18} />
                  </span>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg w-full mt-4 transition duration-300"
            >
              Save Profile
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
