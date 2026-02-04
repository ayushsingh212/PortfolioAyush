import {
  GraduationCap,
  School,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const EducationSection = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const education = [
    {
      id: 1,
      icon: <GraduationCap className="h-8 w-8" />,
      title: "B.Tech in Computer Science",
      institute: "Ajay Kumar Garg Engineering College (AKGEC)",
      location: "Ghaziabad, Uttar Pradesh",
      duration: "2024 – Present",
      score: "8.5 CGPA",
      board: "AKTU",
      gradient: "from-cyan-400 via-blue-500 to-purple-600",
      highlight:
        "Consistent performer with strong focus on Backend, AI, Cloud & DSA.",
    },
    {
      id: 2,
      icon: <School className="h-8 w-8" />,
      title: "Class XII (CBSE)",
      institute: "Shivbrat Singh Children Academy",
      location: "Jhansi, Uttar Pradesh",
      duration: "2022",
      score: "86.8%",
      board: "CBSE Board",
      gradient: "from-green-400 via-emerald-500 to-teal-600",
      highlight: "Strong academic base in Computer Science & Mathematics.",
    },
    {
      id: 3,
      icon: <School className="h-8 w-8" />,
      title: "Class X (CBSE)",
      institute: "Shivbrat Singh Children Academy",
      location: "Jhansi, Uttar Pradesh",
      duration: "2020",
      score: "93%",
      board: "CBSE Board",
      gradient: "from-orange-400 via-red-500 to-pink-600",
      highlight: "High academic distinction with excellent overall performance.",
    },
  ];

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-20 px-4 overflow-hidden"
    >
      {/* Background glow grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
          Education
        </h2>
        <p className="text-gray-400 mt-3 text-lg max-w-2xl mx-auto">
          A strong academic foundation blended with technical excellence and
          continuous learning.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-5xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-600 opacity-30"></div>

        {/* Cards */}
        {education.map((edu, index) => (
          <div
            key={edu.id}
            className={`relative flex items-start md:items-center mb-16 ${
              index % 2 === 0 ? "md:justify-start" : "md:justify-end"
            }`}
          >
            {/* Node */}
            <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2">
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${edu.gradient} p-1 animate-pulse`}
              >
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white">
                  {edu.icon}
                </div>
              </div>
            </div>

            {/* Card */}
            <div
              className={`w-full md:w-5/12 mt-14 md:mt-0 ${
                index % 2 === 0 ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
              }`}
            >
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-1">
                  {edu.title}
                </h3>
                <p className="text-cyan-400 font-medium">{edu.institute}</p>

                <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                  <MapPin size={16} /> {edu.location}
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar size={16} /> {edu.duration}
                </div>

                <div className="mt-3 text-purple-300 font-semibold text-sm">
                  {edu.board}
                </div>

                <div className="mt-1 text-white text-sm font-semibold">
                  Score: {edu.score}
                </div>

                <p className="text-gray-300 text-sm mt-3">{edu.highlight}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
