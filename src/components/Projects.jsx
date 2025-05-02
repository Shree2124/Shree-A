import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Code } from 'lucide-react';
import meetai from "../assets/projects/meetai.png";
import lms from "../assets/projects/lms.png";
import tunetube from "../assets/projects/tunetube.png";
import blogify from "../assets/projects/blogify.png";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const titleRef = useRef(null);
  const filtersRef = useRef(null);
  const projectRefs = useRef([]);

  // Updated projects data with tags array
  const projects = [
    {
      id: 1,
      title: "MeetAI",
      description: "A full-featured AI Powered Meeting Platform.",
      image: meetai,
      tags: ["full-stack", "frontend", "backend"],
      technologies: ["Next.js", "Node.js", "MongoDB", "Express", "GetStream"],
      liveUrl: "https://meet-ai-olive.vercel.app/",
      githubUrl: "https://github.com/Shree2124/meet-ai",
    },
    {
      id: 2,
      title: "LMS (Learning Management System)",
      description: "Interactive Learning Management System with user authentication, course creation, and progress tracking.",
      image: lms,
      tags: ["full-stack", "frontend", "backend"],
      technologies: ["React.js", "Chart.js", "Tailwind CSS", "Node.js", "Express.js"],
      liveUrl: "https://scroll-hack-rust.vercel.app/",
      githubUrl: "https://github.com/Shree2124/ScrollHack",
    },
    {
      id: 3,
      title: "Tune Tube (Youtube Clone)",
      description: "A full stack YouTube clone with user authentication, video upload, like and comment system.",
      image: tunetube,
      tags: ["full-stack", "frontend", "backend"],
      technologies: ["React.js", "Tailwind CSS", "Node.js", "Express.js"],
      liveUrl: "https://youtube-clone-ca89.vercel.app/",
      githubUrl: "https://github.com/Shree2124/Youtube-Clone",
    },
    {
      id: 4,
      title: "Blogify (Blog Storing App)",
      description: "A blog storing app with appwrite as backend service. This application stores your blog in one place.",
      image: blogify,
      tags: ["frontend"],
      technologies: ["React.js", "Tailwind CSS", "MUI", "Appwrite"],
      liveUrl: "https://blogify-seven-omega.vercel.app/",
      githubUrl: "https://github.com/Shree2124/Blogify",
    },
  ];

  // Get available filters dynamically from project tags
  const availableFilters = ['all', ...new Set(projects.flatMap(project => project.tags))];

  // Improved filtering logic
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  // Setup intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (filtersRef.current) observer.observe(filtersRef.current);
    
    // Observe all project refs that exist
    projectRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [filteredProjects]); // Re-run when filtered projects change

  // Reset and prepare project refs
  useEffect(() => {
    // Initialize the refs array with the correct length
    projectRefs.current = Array(filteredProjects.length).fill(null);
  }, [filteredProjects]);

  // Function to get tag display style
  const getTagStyle = (tag) => {
    switch (tag) {
      case 'frontend':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300';
      case 'backend':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300';
      case 'full-stack':
        return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="px-4 md:px-6 py-20">
      <div className="mx-auto container">
        <h2 
          ref={titleRef}
          className="opacity-0 mb-12 font-bold text-3xl md:text-4xl text-center transition-opacity duration-500"
        >
          My <span className="text-gradient">Projects</span>
        </h2>
        
        <div 
          ref={filtersRef}
          className="flex flex-wrap justify-center opacity-0 mb-12 transition-opacity duration-500"
        >
          {availableFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`mx-2 mb-2 px-4 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium'
                  : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              className="bg-white dark:bg-slate-800 opacity-0 shadow-lg hover:shadow-xl rounded-xl overflow-hidden transition-all hover:-translate-y-2 duration-300 transform"
            >
              <div className="group relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 p-6 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full text-white transition-colors"
                      aria-label="View Live Site"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-700 hover:bg-slate-800 p-2 rounded-full text-white transition-colors"
                      aria-label="View Source Code"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="mb-2 font-bold text-xl">{project.title}</h3>
                <p className="mb-4 text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className={`text-xs font-medium px-3 py-1 rounded-full ${getTagStyle(tag)}`}
                      >
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-slate-600 hover:text-blue-500 dark:hover:text-blue-400 dark:text-slate-300 text-sm transition-colors"
                    >
                      <ExternalLink size={14} className="mr-1" /> Live
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-slate-600 hover:text-blue-500 dark:hover:text-blue-400 dark:text-slate-300 text-sm transition-colors"
                    >
                      <Code size={14} className="mr-1" /> Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;