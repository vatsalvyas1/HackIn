import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Code2, Image, Video, Github } from "lucide-react";
import clsx from "clsx";

const FeedForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [githubLink, setGithubLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !codeSnippet && !image && !video) return;

    setIsSubmitting(true);
    try {
      const userId = user?._id;
      if (!userId) throw new Error("User ID is missing");

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("content", content);
      formData.append("codeSnippet", codeSnippet);
      formData.append("githubLink", githubLink);
      if (image) formData.append("image", image.file);
      if (video) formData.append("video", video);

      await onSubmit(formData);

      // Reset form
      setContent("");
      setCodeSnippet("");
      setGithubLink("");
      setImage(null);
      setVideo(null);
      setShowCodeEditor(false);
    } catch (error) {
      console.error("Error submitting feed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-800 backdrop-blur-sm p-6 rounded-lg border border-neutral-700 shadow-xl">
      <div className="flex items-start space-x-4">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center overflow-hidden shadow-lg">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-white font-bold text-lg">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          )}
        </div>
        
        <div className="flex-1 space-y-4">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
            placeholder="Share your thoughts, code, or project..."
            className="bg-neutral-900/50 text-white rounded-lg border border-neutral-700/50 w-full overflow-x-auto"
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link'],
                ['clean']
              ]
            }}
          />

          {showCodeEditor && (
            <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-700/50 overflow-x-auto">
              <textarea
                value={codeSnippet}
                onChange={handleCodeChange}
                placeholder="// Enter your code here..."
                className="bg-transparent text-white w-full h-32 focus:outline-none font-mono resize-none p-2 overflow-x-auto"
              />
              {codeSnippet && (
                <div className="mt-2">
                  <SyntaxHighlighter 
                    language="javascript" 
                    style={vscDarkPlus}
                    className="rounded-md overflow-x-auto max-w-3xl"
                  >
                    {codeSnippet}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <label className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-neutral-700/30 hover:bg-neutral-700/50 transition-colors cursor-pointer text-neutral-300 hover:text-white">
                <Image size={18} />
                <span className="text-sm">Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <label className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-neutral-700/30 hover:bg-neutral-700/50 transition-colors cursor-pointer text-neutral-300 hover:text-white">
                <Video size={18} />
                <span className="text-sm">Video</span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => setShowCodeEditor(!showCodeEditor)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-neutral-700/30 hover:bg-neutral-700/50 transition-colors text-neutral-300 hover:text-white"
              >
                <Code2 size={18} />
                <span className="text-sm">Code</span>
              </button>
            </div>

            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Github size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="url"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  placeholder="GitHub repository link (optional)"
                  className="w-full bg-neutral-900/50 text-white rounded-lg border border-neutral-700/50 pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {image && (
            <div className="relative inline-block">
              <img
                src={image.preview}
                alt="Upload preview"
                className="max-w-md h-auto rounded-lg border border-neutral-700/50"
              />
              <button
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full p-1 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {video && (
            <div className="text-sm text-neutral-300 bg-neutral-900/50 px-3 py-2 rounded-lg inline-flex items-center">
              <Video size={16} className="mr-2" />
              {video.name}
              <button
                onClick={() => setVideo(null)}
                className="ml-2 text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || (!content.trim() && !codeSnippet && !image && !video)}
              className={clsx(
                "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                "bg-purple-600 hover:from-purple-700",
                "text-white shadow-lg",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
              )}
            >
              {isSubmitting ? "Posting..." : "Post to Feed"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedForm;