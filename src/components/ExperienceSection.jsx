import { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Users, 
  Code2, 
  TrendingUp, 
  Zap,
  Star,
  ChevronRight,
  Server,
  Database
} from 'lucide-react';

export const ExperienceSection = () => {
  const [activeExperience, setActiveExperience] = useState(0);
  const sectionRef = useRef(null);

  const experiences = [
    {
      id: 1,
      company: "TheNimantran.com",
      role: "Technical Head & Full Stack Developer",
      type: "Full-Time",
      period: "Oct 2024 – Present",
      location: "Banaras, Uttar Pradesh",
      status: "Current",
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      icon: <Briefcase className="h-6 w-6" />,
      achievements: [
        {
          text: "Leading a 10-member engineering team to build a MERN-based e-commerce platform",
          metric: "2000+ active users",
          icon: <Users className="h-5 w-5" />,
          color: "from-cyan-400 to-blue-500"
        },
        {
          text: "Optimized MongoDB with aggregation pipelines & indexing",
          metric: "50% faster queries",
          icon: <Database className="h-5 w-5" />,
          color: "from-blue-400 to-indigo-500"
        },
        {
          text: "Implemented AWS EC2 + Cloudflare CDN + Docker CI/CD",
          metric: "40% faster load speeds",
          icon: <TrendingUp className="h-5 w-5" />,
          color: "from-indigo-400 to-cyan-500"
        }
      ],
      tags: ["MERN Stack", "Cloudflare", "AWS EC2", "Docker", "Performance Optimization"]
    },

    {
      id: 2,
      company: "Software Incubator, AKGEC",
      role: "Backend Developer",
      type: "Developer Role",
      period: "Oct 2025 – Present",
      location: "Ghaziabad, Uttar Pradesh",
      status: "Current",
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      icon: <Server className="h-6 w-6" />,
      achievements: [
        {
          text: "Building scalable REST APIs with Node.js, Express.js, MongoDB & Redis",
          metric: "6000+ users",
          icon: <Code2 className="h-5 w-5" />,
          color: "from-cyan-400 to-blue-500"
        },
        {
          text: "Developing real-time attendance system with optimized socket performance",
          metric: "35% lower DB load",
          icon: <TrendingUp className="h-5 w-5" />,
          color: "from-blue-400 to-indigo-500"
        },
        {
          text: "Working with a 45+ member engineering team following agile workflows",
          metric: "Team Collaboration",
          icon: <Users className="h-5 w-5" />,
          color: "from-indigo-400 to-cyan-500"
        }
      ],
      tags: ["Node.js", "Express.js", "MongoDB", "Redis", "Real-Time Systems"]
    }
  ];

  const currentExperience = experiences[activeExperience];

  const FloatingElements = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          <div className="w-2 h-2 bg-cyan-400/30 rounded-full blur-sm" />
        </div>
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} id="experience" className="py-20 px-4 relative overflow-hidden">
      <FloatingElements />
      <div className="container mx-auto max-w-7xl relative z-10">
        
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-5xl font-bold mb-4">
              My{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Experience
              </span>
            </h2>
            <Zap className="absolute -top-3 -right-6 h-8 w-8 text-cyan-400 animate-pulse" />
          </div>
          <p className="text-lg text-gray-300">
            Professional journey & impactful contributions.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Timeline */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-10 space-y-4">
              {experiences.map((exp, index) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveExperience(index)}
                  className={`w-full p-4 rounded-xl transition-all duration-300 border ${
                    activeExperience === index
                      ? "bg-white/10 border-cyan-400/50"
                      : "bg-white/5 border-white/10 hover:border-cyan-400/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${exp.gradient} ${
                      activeExperience === index ? "animate-pulse" : ""
                    }`}>
                      {exp.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-sm">{exp.company}</h4>
                      <p className="text-gray-400 text-sm">{exp.role}</p>
                      <p className="text-gray-500 text-xs">{exp.period}</p>
                    </div>

                    <ChevronRight className={`h-4 w-4 transition-transform ${
                      activeExperience === index ? "rotate-90 text-cyan-400" : "text-gray-400"
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Experience Card */}
          <div className="lg:col-span-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">

              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${currentExperience.gradient} animate-pulse`}>
                  {currentExperience.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white">{currentExperience.company}</h3>
                  <p className="text-xl text-cyan-400">{currentExperience.role}</p>

                  <div className="flex items-center gap-4 text-gray-400 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-5 w-5" />
                      {currentExperience.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-5 w-5" />
                      {currentExperience.location}
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="text-xl text-white font-semibold mb-4 flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-400" />
                Key Achievements
              </h4>

              <div className="space-y-4">
                {currentExperience.achievements.map((ach, index) => (
                  <div
                    key={index}
                    className="relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${ach.color}`}>
                        {ach.icon}
                      </div>

                      <div className="flex-1">
                        <p className="text-gray-300">{ach.text}</p>
                        <span className={`inline-block mt-2 px-3 py-1 rounded-full bg-gradient-to-r ${ach.color} text-white text-sm font-bold`}>
                          {ach.metric}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h5 className="mt-6 text-gray-400 text-sm font-semibold">Technologies</h5>
              <div className="flex flex-wrap gap-2 mt-2">
                {currentExperience.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm bg-white/10 text-gray-300 rounded-full hover:bg-cyan-400/20 hover:text-cyan-400 transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) }
          50% { transform: translateY(-10px) }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
};
