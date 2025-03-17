import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/project/${id}`);
        if (!response.ok) throw new Error("Failed to fetch project");
        const result = await response.json();
        setProject(result);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (!project) return <div className="text-white">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto text-white p-4">
      <h1 className="text-2xl font-bold">{project.projectTitle}</h1>
      <p className="text-neutral-400">{project.description}</p>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Hackathon</h3>
        <p>{project.hackathonName}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Team Name</h3>
        <p>{project.teamName}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Achievement</h3>
        <p>{project.achievement}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Tech Stack</h3>
        <p>{project.techStack.join(", ")}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">GitHub</h3>
        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
          {project.githubLink}
        </a>
      </div>

      {project.liveDemo && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Live Demo</h3>
          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            {project.liveDemo}
          </a>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Images</h3>
        <div className="flex gap-2 mt-2">
          {project.images.map((image, index) => (
            <img key={index} src={image} alt={`Project ${index + 1}`} className="w-32 h-32 object-cover rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}
