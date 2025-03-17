// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function ProjectDetails() {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);

//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/v1/project/${id}`);
//         if (!response.ok) throw new Error("Failed to fetch project");
//         const result = await response.json();
//         setProject(result);
//       } catch (error) {
//         console.error("Error fetching project:", error);
//       }
//     };

//     fetchProjectDetails();
//   }, [id]);

//   if (!project) return <div className="text-white">Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto text-white p-4">
//       <h1 className="text-2xl font-bold">{project.projectTitle}</h1>
//       <p className="text-neutral-400">{project.description}</p>
      
//       <div className="mt-4">
//         <h3 className="text-lg font-semibold">Hackathon</h3>
//         <p>{project.hackathonName}</p>
//       </div>

//       <div className="mt-4">
//         <h3 className="text-lg font-semibold">Team Name</h3>
//         <p>{project.teamName}</p>
//       </div>

//       <div className="mt-4">
//         <h3 className="text-lg font-semibold">Achievement</h3>
//         <p>{project.achievement}</p>
//       </div>

//       <div className="mt-4">
//         <h3 className="text-lg font-semibold">Tech Stack</h3>
//         <p>{project.techStack.join(", ")}</p>
//       </div>

//       <div className="mt-4">
//         <h3 className="text-lg font-semibold">GitHub</h3>
//         <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
//           {project.githubLink}
//         </a>
//       </div>

//       {project.liveDemo && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Live Demo</h3>
//           <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
//             {project.liveDemo}
//           </a>
//         </div>
//       )}

//       <div className="mt-4">
//         <h3 className="text-lg font-semibold">Images</h3>
//         <div className="flex gap-2 mt-2">
//           {project.images.map((image, index) => (
//             <img key={index} src={image} alt={`Project ${index + 1}`} className="w-32 h-32 object-cover rounded-md" />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Github,
  Globe,
  Award,
  Users,
  Code2,
  ExternalLink,
  Loader2,
  Trophy,
  Calendar,
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/project/${id}`);
        if (!response.ok) throw new Error("Failed to fetch project");
        const result = await response.json();
        setProject(result);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  useEffect(() => {
    if (project?.images?.length) {
      const interval = setInterval(() => {
        setActiveImage((current) => (current + 1) % project.images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [project?.images?.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto" />
          <p className="text-neutral-400 animate-pulse">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 text-neutral-400">
          <div className="w-16 h-16 mx-auto border-2 border-neutral-700 rounded-full flex items-center justify-center">
            <ExternalLink className="w-8 h-8" />
          </div>
          <p className="text-xl">Project not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="glass-card rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-500/20 to-transparent" />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-5xl font-bold text-neutral-300 text-gradient mb-6 animate-float">
              {project.projectTitle}
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Image Showcase */}
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <ImageIcon className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-semibold text-white">Project Showcase</h2>
              </div>
              
              <div className="relative aspect-video rounded-xl overflow-hidden">
                {project.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Project ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === activeImage ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>

              <div className="flex justify-center gap-2">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeImage
                        ? "bg-blue-400 w-8"
                        : "bg-neutral-600 hover:bg-neutral-500"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Code2 className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-semibold text-white">Technologies Used</h2>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-full glass-card text-sm font-medium text-blue-300 hover:text-blue-200 transition-colors cursor-default"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Achievement Card */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-semibold text-white">Achievement</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-purple-400" />
                  <p className="text-emerald-400 font-medium">{project.achievement}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <p className="text-neutral-300">{project.hackathonName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-pink-400" />
                  <p className="text-neutral-300">{project.teamName}</p>
                </div>
              </div>
            </div>

            {/* Project Links */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Project Links</h2>
              
              <div className="space-y-4">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg glass-card hover:bg-white/10 transition-colors group"
                >
                  <Github className="w-5 h-5 text-neutral-300" />
                  <span className="text-neutral-300 group-hover:text-white">Repository</span>
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg glass-card hover:bg-white/10 transition-colors group"
                  >
                    <Globe className="w-5 h-5 text-neutral-300" />
                    <span className="text-neutral-300 group-hover:text-white">Live Demo</span>
                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}