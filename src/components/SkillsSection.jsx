import { useState, useEffect, useRef } from 'react';
import { Code, Database, Globe, Server, Sparkles, Zap, Star } from 'lucide-react';

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const SkillLogos = {
    'React.js': () => <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center text-blue-900 font-bold">R</div>,
    'Redux': () => <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">RX</div>,
    'Next.js': () => <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold">NX</div>,
    'JavaScript': () => <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-black font-bold">JS</div>,
    'TypeScript': () => <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">TS</div>,
    'HTML5': () => <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">HT</div>,
    'CSS3': () => <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center text-white font-bold">CS</div>,
    'Tailwind CSS': () => <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">TW</div>,

    'Node.js': () => <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">ND</div>,
    'Express.js': () => <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-white font-bold">EX</div>,
    'RESTful APIs': () => <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">API</div>,
    'GraphQL': () => <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold">GQ</div>,
    'WebSockets': () => <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">WS</div>,
    'Socket.io': () => <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">IO</div>,
    'WebRTC': () => <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center text-white font-bold">RTC</div>,

    'MongoDB': () => <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">MG</div>,
    'PostgreSQL': () => <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">PG</div>,
    'Redis': () => <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">RD</div>,
    'AWS': () => <div className="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center text-black font-bold">AWS</div>,
    'Cloudflare': () => <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">CF</div>,
    'Firebase': () => <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-black font-bold">FB</div>,

    'Docker': () => <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">DK</div>,
    'Kubernetes': () => <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold">KB</div>,
    'Git': () => <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">GT</div>,
    'GitHub Actions': () => <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-white font-bold">GA</div>,
    'CI/CD': () => <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">CI</div>,
    'Postman': () => <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">PM</div>,
    'Nginx': () => <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center text-white font-bold">NX</div>,

    'Java': () => <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">JV</div>,
    'Python': () => <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">PY</div>,
    'JavaScript': () => <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-black font-bold">JS</div>,
    'TypeScript': () => <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">TS</div>,
    'SQL': () => <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">SQL</div>,
    'Dart': () => <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center text-white font-bold">DT</div>,
    'C++': () => <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">C++</div>,
    'C': () => <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center text-white font-bold">C</div>
  };

  const skillCategories = {
    frontend: {
      title: 'Frontend',
      icon: <Globe className="h-6 w-6" />,
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      skills: [
        { name: 'React.js', level: 95 },
        { name: 'Redux', level: 90 },
        { name: 'Next.js', level: 92 },
        { name: 'JavaScript', level: 95 },
        { name: 'TypeScript', level: 85 },
        { name: 'HTML5', level: 96 },
        { name: 'CSS3', level: 94 },
        { name: 'Tailwind CSS', level: 92 }
      ]
    },

    backend: {
      title: 'Backend',
      icon: <Server className="h-6 w-6" />,
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Express.js', level: 88 },
        { name: 'RESTful APIs', level: 92 },
        { name: 'GraphQL', level: 80 },
        { name: 'WebSockets', level: 82 },
        { name: 'Socket.io', level: 88 },
        { name: 'WebRTC', level: 75 }
      ]
    },

    database: {
      title: 'Databases & Cloud',
      icon: <Database className="h-6 w-6" />,
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      skills: [
        { name: 'MongoDB', level: 90 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'Redis', level: 80 },
        { name: 'AWS', level: 88 },
        { name: 'Cloudflare', level: 85 },
        { name: 'Firebase', level: 80 }
      ]
    },

    tools: {
      title: 'DevOps & Tools',
      icon: <Code className="h-6 w-6" />,
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      skills: [
        { name: 'Docker', level: 85 },
        { name: 'Kubernetes', level: 75 },
        { name: 'Git', level: 95 },
        { name: 'GitHub Actions', level: 90 },
        { name: 'CI/CD', level: 88 },
        { name: 'Postman', level: 90 },
        { name: 'Nginx', level: 82 }
      ]
    },

    programming: {
      title: 'Programming',
      icon: <Code className="h-6 w-6" />,
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      skills: [
        { name: 'JavaScript', level: 95 },
        { name: 'TypeScript', level: 85 },
        { name: 'Python', level: 85 },
        { name: 'Java', level: 80 },
        { name: 'C++', level: 75 },
        { name: 'C', level: 70 },
        { name: 'SQL', level: 92 },
        { name: 'Dart', level: 70 }
      ]
    }
  };

  const currentSkills = skillCategories[activeCategory];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const FloatingParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );

  const GlowCursor = () => (
    <div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{
        left: mousePosition.x - 10,
        top: mousePosition.y - 10,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="w-20 h-20 bg-gradient-to-r from-cyan-400/20 to-indigo-600/20 rounded-full blur-xl animate-pulse" />
    </div>
  );

  return (
    <section ref={sectionRef} id="skills" className="py-24 px-4 relative overflow-hidden bg-black">
      <FloatingParticles />
      <GlowCursor />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-indigo-600/5" />
        <div
          className="absolute inset-0"
          style={{
            backgroundSize: '60px 60px',
            backgroundImage: `
              linear-gradient(rgba(0,180,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,180,255,0.05) 1px, transparent 1px)
            `
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">Skills</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">A refined collection of the technologies I master</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(skillCategories).map(([key, cat]) => (
            <button
              key={key}
              className={`group relative px-6 py-3 rounded-2xl font-medium transition-all duration-500 ${
                activeCategory === key ? 'text-white shadow-xl' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveCategory(key)}
            >
              <div
                className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                  activeCategory === key
                    ? `bg-gradient-to-r ${cat.gradient} opacity-100`
                    : 'bg-white/5 opacity-0 group-hover:opacity-100'
                }`}
              />
              <div className="relative flex items-center gap-2">{cat.icon}<span>{cat.title}</span></div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSkills.skills.map((skill, idx) => (
            <div
              key={idx}
              className="group relative transform transition-all duration-700 hover:scale-105"
              onMouseEnter={() => setHoveredSkill(idx)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="relative p-6 rounded-2xl backdrop-blur-lg border border-white/10 group-hover:border-cyan-400/50 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <div className="absolute top-2 right-2 text-xl text-cyan-400">⚡</div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div>{SkillLogos[skill.name]()}</div>
                    <h3 className="text-white font-bold text-lg group-hover:text-cyan-400 transition-colors">{skill.name}</h3>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-300 font-mono">{skill.level}%</span>
                  </div>

                  <div className="relative">
                    <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-indigo-600 rounded-full transition-all duration-1000"
                        style={{ width: hoveredSkill === idx ? `${skill.level}%` : '0%' }}
                      />
                    </div>
                    <div
                      className="absolute top-0 h-2 bg-gradient-to-r from-cyan-400 to-indigo-600 rounded-full blur-sm opacity-50 transition-all duration-1000"
                      style={{ width: hoveredSkill === idx ? `${skill.level}%` : '0%' }}
                    />
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-600 opacity-0 group-hover:opacity-10 blur-xl transform scale-110" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
      `}</style>
    </section>
  );
}
