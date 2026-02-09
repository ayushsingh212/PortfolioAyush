import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Server,
  Database,
  Code,
  Star
} from "lucide-react";

/* ---------------- CONFIG ---------------- */

const SKILLS = {
  frontend: {
    title: "Frontend",
    icon: Globe,
    skills: [
      ["Canvas"],
      ["Framer-motion"],
      ["React.js", 95],
      ["Next.js", 92],
      ["Redux", 90],
      ["TypeScript", 85],
      ["Tailwind CSS", 92],
      ["HTML5", 96],
      ["CSS3", 94],
      ["JavaScript", 95]
    ]
  },

  backend: {
    title: "Backend",
    icon: Server,
    skills: [
      ["Node.js", 90],
      ["Express.js", 88],
      ["REST APIs", 92],
      ["GraphQL", 80],
      ["Socket.io", 88],
      ["WebRTC", 75]
    ]
  },

  database: {
    title: "Cloud & DB",
    icon: Database,
    skills: [
      ["MongoDB", 90],
      ["PostgreSQL", 85],
      ["Redis", 80],
      ["AWS", 88],
      ["Firebase", 80]
    ]
  },

  programming: {
    title: "Programming",
    icon: Code,
    skills: [
      ["JavaScript", 95],
      ["Python", 85],
      ["Java", 80],
      ["C++", 75],
      ["C", 70],
      ["SQL", 92]
    ]
  }
};

/* ---------------- MAIN ---------------- */

export default function SkillsSection() {

  const [active, setActive] = useState("frontend");

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const card = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const current = SKILLS[active];

  return (
    <section
      id="skills"
      className="py-28 bg-black relative overflow-hidden"
    >

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-purple-500/10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
              Skills
            </span>
          </h2>

          <p className="mt-6 text-gray-400 max-w-xl mx-auto">
            Technologies I use to build scalable, secure,
            and high-performance systems.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">

          {Object.entries(SKILLS).map(([key, cat]) => {

            const Icon = cat.icon;

            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`
                  px-6 py-3 rounded-xl flex items-center gap-2
                  transition-all duration-300
                  ${
                    active === key
                      ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg"
                      : "bg-white/5 text-gray-400 hover:text-white"
                  }
                `}
              >
                <Icon size={18} />
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >

          {current.skills.map(([name, level]) => (

            <motion.div
              key={name}
              variants={card}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >

              <div className="
                p-6 rounded-2xl border border-white/10
                backdrop-blur-xl
                bg-white/[0.02]
                hover:border-cyan-400/40
                transition-all
              ">

                {/* Glow */}
                <div className="
                  absolute inset-0 opacity-0 group-hover:opacity-100
                  bg-gradient-to-r from-cyan-500/10 to-indigo-500/10
                  rounded-2xl
                  transition
                " />

                <div className="relative z-10">

                  {/* Title */}
                  <div className="flex items-center justify-between mb-3">

                    <h3 className="text-lg font-semibold text-white">
                      {name}
                    </h3>

                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={14} />
                      <span className="text-sm font-mono text-gray-300">
                        {level}%
                      </span>
                    </div>

                  </div>

                  {/* Progress */}
                  <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      transition={{ duration: 1 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-indigo-600"
                    />

                  </div>

                </div>
              </div>

            </motion.div>

          ))}
        </motion.div>

      </div>
    </section>
  );
}
