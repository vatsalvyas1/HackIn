import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const FeedForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [githubLink, setGithubLink] = useState("");

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;


  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleCodeChange = (e) => {
    setCodeSnippet(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage({ file, preview: imageUrl });
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);
    const userId = JSON.parse(storedUser)?._id;
  
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
  
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("content", content);
    formData.append("codeSnippet", codeSnippet);
    formData.append("githubLink", githubLink);
    if (image) formData.append("image", image.file);
    if (video) formData.append("video", video);
  
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    await onSubmit(formData);
  
    setContent("");
    setCodeSnippet("");
    setGithubLink("");
    setImage(null);
    setVideo(null);
    setShowCodeEditor(false);
  };

  return (
    <div className="bg-neutral-800 p-4 border-x border-b border-neutral-700 max-w-5xl mx-auto">
      <div className="flex items-start space-x-4">
        <div className="h-10 w-10 rounded-full bg-purple-700 flex items-center justify-center">
        <div className="h-10 w-10 rounded-full bg-purple-700 flex items-center justify-center overflow-hidden">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-white font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          )}
        </div>
      </div>
        <div className="flex-1 w-full">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
            placeholder="Share your thoughts, code, or project..."
            className="bg-neutral-900 text-white rounded-lg border p-3 border-neutral-700 w-full mb-4"
          />

          {showCodeEditor && (
            <div className="bg-neutral-900 rounded-lg p-4 border w-full border-neutral-700 mb-4">
              <textarea
                value={codeSnippet}
                onChange={handleCodeChange}
                placeholder="Enter your JavaScript code here..."
                className="bg-transparent text-white w-full h-32 focus:outline-none font-mono"
              />
              <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {codeSnippet}
              </SyntaxHighlighter>
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="githubLink"
              className="block text-sm font-medium text-neutral-400 mb-1"
            >
              GitHub Link (Optional)
            </label>
            <input
              type="url"
              id="githubLink"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="bg-neutral-900 text-white rounded-lg border p-2 border-neutral-700 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex space-x-2 w-full mb-4">
            <label className="flex items-center text-neutral-400 hover:text-purple-400 transition-colors duration-300 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Image
            </label>
            {image && (
              <div className="relative w-48 h-48 mt-4">
                <img
                  src={image.preview}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-lg border border-neutral-700"
                />
                <button
                  onClick={handleDeleteImage}
                  className="absolute top-1 right-1 bg-red-600 hover:bg-red-500 text-white rounded-full p-1 transition duration-300"
                >
                  ✕
                </button>
              </div>
            )}

            <label className="flex items-center text-neutral-400 hover:text-purple-400 transition-colors duration-300 cursor-pointer">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Video
            </label>
            <button
              onClick={() => setShowCodeEditor(!showCodeEditor)}
              className="flex items-center text-neutral-400 hover:text-purple-400 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              Code
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-300"
          >
            Post to Feed
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedForm;