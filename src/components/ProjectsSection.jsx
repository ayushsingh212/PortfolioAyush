import { useRef, useState, useEffect, useMemo } from "react";
import { ExternalLink, Github, Star, Rocket } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "AiCrona — AI Academic Scheduler",
    description:
      "AI-based timetable & assignment planner for students. Prototype built with MERN, uses optimized algorithms and clean UI for schedule generation.",
    image: "/aicrona.png",
    tags: ["React.js", "Node.js", "MongoDB", "AI Engine", "Scheduler", "Automation"],
    demoUrl: "https://ai.cronaweb.me",
    githubUrl: "https://github.com/ayushsingh212/Synchron-Backend",
    gradient: "from-cyan-400 via-blue-500 to-indigo-600",
    difficulty: "Expert",
    category: "AI/ML"
  },
  {
    id: 2,
    title: "Crona — Social Media Platform",
    description:
      "Full-stack social media platform (MERN) with posts, real-time chat, comments, responsive UI and scalable backend architecture.",
    image: "/projects/crona-preview.png",
    tags: ["MERN Stack", "WebSockets", "JWT Auth", "Responsive", "Social"],
    demoUrl: null,
    githubUrl: "https://github.com/ayushsingh212/Crona-Backend-/trees/production",
    gradient: "from-cyan-400 via-indigo-500 to-blue-500",
    difficulty: "Advanced",
    category: "Web App"
  }
];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // 3D Hover Effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let frame;

    const handleMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotY = (x / rect.width) * 12;
        const rotX = -(y / rect.height) * 12;

        card.style.transform = `
          perspective(1000px)
          rotateX(${rotX}deg)
          rotateY(${rotY}deg)
          scale3d(1.05, 1.05, 1.05)
        `;
      });
    };

    const reset = () => {
      card.style.transform = `
        perspective(900px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1,1,1)
      `;
    };

    const enter = () => setHovered(true);
    const leave = () => {
      reset();
      setHovered(false);
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseenter", enter);
    card.addEventListener("mouseleave", leave);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
    };
  }, []);

  // Fade-in Animation Fix
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0) scale(1)";
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
  <article
  ref={cardRef}
  className="group relative bg-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden
  border border-gray-700/40 transition-all duration-700
  opacity-0 translate-y-10 scale-95 min-h-[500px] flex flex-col"
  style={{ transitionDelay: `${index * 0.15}s` }}
>

      {/* Gradient glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient}
        opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
      />

      {/* Image */}
      <img
        src={project.image}
        alt={project.title}
        className="h-56 w-full object-cover rounded-t-3xl"
      />

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Tags + difficulty */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="px-2 py-1 text-xs font-semibold text-white bg-gray-800/50 rounded-full">
            {project.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
          {project.title}
        </h3>

        <p className="text-gray-300 grow mb-6">{project.description}</p>

        {/* Buttons */}
        <div className="mt-auto flex gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-xl hover:scale-105 transition"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}

          <a
            href={project.githubUrl}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-white rounded-xl border border-gray-600 hover:scale-105 transition"
          >
            <Github size={16} /> Code
          </a>
        </div>
      </div>
    </article>
  );
};

// Background particles
const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20 animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${2 + Math.random() * 3}s`,
          animationDelay: `${Math.random() * 2}s`
        }}
      />
    ))}
  </div>
);

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32 px-4 relative overflow-hidden bg-black">
      <FloatingParticles />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 p-3 rounded-xl animate-pulse flex items-center justify-center">
              <Rocket size={24} className="text-white" />
            </div>

            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              My Projects
            </h1>

            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl animate-pulse flex items-center justify-center">
              <Star size={24} className="text-white" />
            </div>
          </div>

          <p className="text-gray-400 text-lg">
            A curated collection of projects built using modern web technologies — showcasing
            full-stack, AI, and real-time applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((proj, idx) => (
            <ProjectCard key={proj.id} project={proj} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
