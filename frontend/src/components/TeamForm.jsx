import { useState } from "react";
import { X, Plus } from "lucide-react";
import { backendUrl } from "../constanst.js";

export default function TeamForm() {
  const [addSkill, setAddSkill] = useState(false);
  const [skills, setSkills] = useState(["React", "NodeJS", "MongoDB"]);
  const [addedSkills, setAddedSkills] = useState([]);
  const [formdata, setFormData] = useState({
    teamName: "",
    hackathonName: "",
    description: "",
    teamSize: 2,
    location: "",
    startDate: "",
    endDate: "",
    lookingFor: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormdata) => ({
      ...prevFormdata,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user");
    const userId = JSON.parse(storedUser)._id;

    try {
      const response = await fetch(
        `${backendUrl}/api/v1/team/create-team`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formdata,
            skills: addedSkills,
            userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong");
      }
      
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const addSkills = (skill) => {
    setAddedSkills([...addedSkills, skill]);
    setSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

  const removeSkill = (skill) => {
    setSkills([...skills, skill]);
    setAddedSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 pt-8 border-t border-neutral-800">
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-mono">
          Need <span className="text-purple-500">Teammates?</span>
        </h3>
        <p className="text-neutral-400">
          Create a post to find the perfect teammates for your hackathon
          project.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        method="post"
        className="bg-neutral-800 rounded-xl p-6 border border-neutral-700"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="team-name"
              className="block text-sm font-medium text-neutral-400 mb-1"
            >
              Team Name
            </label>
            <input
              type="text"
              id="team-name"
              name="teamName"
              value={formdata.teamName}
              onChange={handleChange}
              placeholder="Enter your team name"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="hackathon-name"
              className="block text-sm font-medium text-neutral-400 mb-1"
            >
              Hackathon
            </label>
            <input
              type="text"
              id="hackathon-name"
              name="hackathonName"
              value={formdata.hackathonName}
              onChange={handleChange}
              placeholder="Which hackathon are you participating in?"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-neutral-400 mb-1"
          >
            Project Description
          </label>
          <textarea
            id="description"
            rows="3"
            name="description"
            value={formdata.description}
            onChange={handleChange}
            placeholder="Describe your project and what you're building..."
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="team-size"
              className="block text-sm font-medium text-neutral-400 mb-1"
            >
              Team Size
            </label>
            <input
              type="number"
              id="team-size"
              name="teamSize"
              min={2}
              value={formdata.teamSize}
              onChange={handleChange}
              placeholder="Team size for hackathon?"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-neutral-400 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formdata.location}
              onChange={handleChange}
              placeholder="Hackathon situated at?"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="lookingFor"
            className="block text-sm font-medium text-neutral-400 mb-1"
          >
            Looking For{" "}
            <span className="text-neutral-500">(comma separated values)</span>
          </label>
          <input
            type="text"
            id="lookingFor"
            name="lookingFor"
            value={formdata.lookingFor}
            onChange={handleChange}
            placeholder="e.g., Frontend Dev, UI/UX Designer, AI Engineer"
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="start-date"
              className="block text-sm font-medium text-neutral-400 mb-1"
            >
              Start Date
            </label>
            <input
              type="date"
              id="start-date"
              name="startDate"
              value={formdata.startDate}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="end-date"
              className="block text-sm font-medium text-neutral-400 mb-1"
            >
              End Date
            </label>
            <input
              type="date"
              id="end-date"
              name="endDate"
              value={formdata.endDate}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-400 mb-1">
            Skills Needed
          </label>
          <div className="flex flex-wrap gap-2">
            {addedSkills.map((skill, index) => (
              <span
                key={index}
                className="bg-purple-900/30 text-purple-400 text-xs py-1 px-3 rounded-full border border-purple-800/30 flex items-center font-mono cursor-pointer hover:bg-purple-800/60 transition-colors"
                onClick={() => removeSkill(skill)}
              >
                {skill}
                <X size={16} className="ml-1" />
              </span>
            ))}
            <button
              type="button"
              onClick={() => setAddSkill(!addSkill)}
              className="bg-neutral-700 hover:bg-neutral-600 text-white text-xs py-1 px-3 rounded-full transition-colors duration-300 flex items-center font-mono"
            >
              {addSkill ? (
                <X size={16} className="mr-1" />
              ) : (
                <Plus size={16} className="mr-1" />
              )}
              Add Skill
            </button>
          </div>
          {addSkill && (
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-neutral-900 text-white text-xs py-1 px-3 rounded-full border border-neutral-700 flex items-center font-mono cursor-pointer hover:bg-neutral-800 transition-colors"
                  onClick={() => addSkills(skill)}
                >
                  {skill}
                  <Plus size={16} className="ml-1" />
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
          >
            Post Team Request
          </button>
        </div>
      </form>
    </div>
  );
}
