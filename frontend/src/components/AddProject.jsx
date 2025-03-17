import React, { useState } from "react";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    hackathonName: "",
    projectTitle: "",
    description: "",
    teamName: "",
    achievement: "Participant",
    techStack: [],
    githubLink: "",
    liveDemo: "",
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]); // Store preview URLs

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTechStackChange = (e) => {
    const techStack = e.target.value.split(",").map((tech) => tech.trim());
    setFormData({ ...formData, techStack });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4); 
    setFormData({ ...formData, images: files });

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    const userId = JSON.parse(storedUser)?._id;

    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    const data = new FormData();
    data.append("userId", userId);
    data.append("hackathonName", formData.hackathonName);
    data.append("projectTitle", formData.projectTitle);
    data.append("description", formData.description);
    data.append("teamName", formData.teamName);
    data.append("achievement", formData.achievement);
    data.append("techStack", JSON.stringify(formData.techStack));
    data.append("githubLink", formData.githubLink);
    data.append("liveDemo", formData.liveDemo);

    formData.images.forEach((image) => data.append("images", image));

    try {
      const response = await fetch("http://localhost:3000/api/v1/project", {
        method: "POST",
        body: data,
      });

      if (!response.ok) throw new Error("Failed to create project");

      console.log("Project created successfully");
      
      // Reset form after submission
      setFormData({
        hackathonName: "",
        projectTitle: "",
        description: "",
        teamName: "",
        achievement: "Participant",
        techStack: [],
        githubLink: "",
        liveDemo: "",
        images: [],
      });
      setImagePreviews([]); 

    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto" encType="multipart/form-data">
        <h1 className="text-3xl font-bold mb-8 text-purple-500">Add Project</h1>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Hackathon Name</label>
          <input
            type="text"
            name="hackathonName"
            value={formData.hackathonName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Project Title</label>
          <input
            type="text"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            rows="4"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Tech Stack (comma separated)</label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack.join(", ")}
            onChange={handleTechStackChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">GitHub Link</label>
          <input
            type="url"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Live Demo Link</label>
          <input
            type="url"
            name="liveDemo"
            value={formData.liveDemo}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
          />
        </div>

        {/* Image Upload Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Pictures</label>
          <p className="text-gray-400 text-sm mb-2">UPLOAD A MAXIMUM OF 4 PICTURES, SHOWCASING YOUR PROJECT.</p>
          
          {/* Image Preview Grid */}
          <div className="grid grid-cols-5 gap-4 mb-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-24 h-24 bg-gray-700 flex items-center justify-center rounded-md border border-gray-600"
              >
                {imagePreviews[index] ? (
                  <img
                    src={imagePreviews[index]}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <span className="text-gray-400 text-2xl">+</span>
                )}
              </div>
            ))}
          </div>

          <input
            type="file"
            name="images"
            onChange={handleImageChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            multiple
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-300"
        >
          Add your Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
