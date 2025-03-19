// import React, { useState } from "react";

// const ProjectForm = () => {
//   const [formData, setFormData] = useState({
//     hackathonName: "",
//     projectTitle: "",
//     description: "",
//     teamName: "",
//     achievement: "Participant",
//     techStack: [],
//     githubLink: "",
//     liveDemo: "",
//     images: [],
//   });

//   const [imagePreviews, setImagePreviews] = useState([]); // Store preview URLs

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files).slice(0, 4); 
//     setFormData({ ...formData, images: files });

//     const previewUrls = files.map((file) => URL.createObjectURL(file));
//     setImagePreviews(previewUrls);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const storedUser = localStorage.getItem("user");
//     const userId = JSON.parse(storedUser)?._id;

//     if (!userId) {
//       console.error("User ID is missing");
//       return;
//     }

//     const data = new FormData();
//     data.append("userId", userId);
//     data.append("hackathonName", formData.hackathonName);
//     data.append("projectTitle", formData.projectTitle);
//     data.append("description", formData.description);
//     data.append("teamName", formData.teamName);
//     data.append("achievement", formData.achievement);
//     data.append("techStack", formData.techStack);
//     data.append("githubLink", formData.githubLink);
//     data.append("liveDemo", formData.liveDemo);

//     formData.images.forEach((image) => data.append("images", image));

//     console.log(
//       formData.hackathonName,
//       formData.projectTitle,
//       formData.description,
//       formData.teamName,
//       formData.achievement,
//       formData.techStack,
//       formData.githubLink,
//       formData.liveDemo,
//       userId,
//       formData.images);

//     try {
//       const response = await fetch("http://localhost:3000/api/v1/project", {
//         method: "POST",
//         body: data,
//       });

//       if (!response.ok) throw new Error("Failed to create project");

//       console.log("Project created successfully");
      
//       // Reset form after submission
//       setFormData({
//         hackathonName: "",
//         projectTitle: "",
//         description: "",
//         teamName: "",
//         achievement: "Participant",
//         techStack: [],
//         githubLink: "",
//         liveDemo: "",
//         images: [],
//       });
//       setImagePreviews([]); 

//     } catch (error) {
//       console.error("Error creating project:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-8">
//       <form onSubmit={handleSubmit} className="max-w-2xl mx-auto" encType="multipart/form-data">
//         <h1 className="text-3xl font-bold mb-8 text-purple-500">Add Project</h1>

//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2">Hackathon Name</label>
//           <input
//             type="text"
//             name="hackathonName"
//             value={formData.hackathonName}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2">Project Title</label>
//           <input
//             type="text"
//             name="projectTitle"
//             value={formData.projectTitle}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
//             rows="4"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2">Tech Stack (comma separated)</label>
//           <input
//             type="text"
//             name="techStack"
//             value={formData.techStack}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2">Team Name</label>
//           <input
//             type="text"
//             name="teamName"
//             value={formData.teamName}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2">Achievement</label>
//           <select
//             name="achievement"
//             value={formData.achievement}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
//           >
//             <option value="Participant">Participant</option>
//             <option value="Winner">Winner</option>
//             <option value="Runner-up">Runner-up</option>
//           </select>
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2">GitHub Link</label>
//           <input
//             type="url"
//             name="githubLink"
//             value={formData.githubLink}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2">Live Demo Link</label>
//           <input
//             type="url"
//             name="liveDemo"
//             value={formData.liveDemo}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
//           />
//         </div>

//         {/* Image Upload Section */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2">Pictures</label>
//           <p className="text-gray-400 text-sm mb-2">UPLOAD A MAXIMUM OF 4 PICTURES, SHOWCASING YOUR PROJECT.</p>
          
//           {/* Image Preview Grid */}
//           <div className="grid grid-cols-5 gap-4 mb-4">
//             {[...Array(4)].map((_, index) => (
//               <div
//                 key={index}
//                 className="w-24 h-24 bg-gray-700 flex items-center justify-center rounded-md border border-gray-600"
//               >
//                 {imagePreviews[index] ? (
//                   <img
//                     src={imagePreviews[index]}
//                     alt={`Preview ${index + 1}`}
//                     className="w-full h-full object-cover rounded-md"
//                   />
//                 ) : (
//                   <span className="text-gray-400 text-2xl">+</span>
//                 )}
//               </div>
//             ))}
//           </div>

//           <input
//             type="file"
//             name="images"
//             onChange={handleImageChange}
//             className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
//             multiple
//             accept="image/*"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-300"
//         >
//           Add your Project
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProjectForm;

import React, { useState } from "react";
import { Upload, X } from "lucide-react";

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

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setFormData({ ...formData, images: files });

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previewUrls);
  };

  const removeImage = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newImages = Array.from(formData.images).filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    setFormData({ ...formData, images: newImages });
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
    data.append("techStack", formData.techStack);
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
    <div className="min-h-screen bg-neutral-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg border border-neutral-700/50">
          <div className="p-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent mb-8">
              Add New Project
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-300">Hackathon Name</label>
                  <input
                    type="text"
                    name="hackathonName"
                    value={formData.hackathonName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-300">Project Title</label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-300">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  rows="4"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-300">Tech Stack</label>
                  <input
                    type="text"
                    name="techStack"
                    value={formData.techStack}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB..."
                    className="w-full px-4 py-2.5 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-300">Team Name</label>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-300">Achievement</label>
                  <select
                    name="achievement"
                    value={formData.achievement}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  >
                    <option value="Participant">Participant</option>
                    <option value="Winner">Winner</option>
                    <option value="Runner-up">Runner-up</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-300">GitHub Link</label>
                  <input
                    type="url"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-300">Live Demo Link</label>
                  <input
                    type="url"
                    name="liveDemo"
                    value={formData.liveDemo}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-neutral-300">Project Images</label>
                  <span className="text-xs text-neutral-400">Maximum 4 images</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-xl border-2 border-neutral-700/50"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {imagePreviews.length < 4 && (
                    <label className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-neutral-700/50 rounded-xl cursor-pointer hover:border-purple-500 transition-colors duration-300">
                      <Upload size={24} className="text-neutral-400" />
                      <span className="mt-2 text-sm text-neutral-400">Upload Image</span>
                      <input
                        type="file"
                        name="images"
                        onChange={handleImageChange}
                        className="hidden"
                        multiple
                        accept="image/*"
                      />
                    </label>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                Add Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
