import { useState, useEffect } from 'react';

export const PortfolioLoader = ({ onLoadingComplete }) => {
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loadingText, setLoadingText] = useState('Initializing Systems...');
  const [currentSkill, setCurrentSkill] = useState(0);

  const nameTranslations = [
    { name: "Ayush Singh", lang: "English", script: "latin" },
    { name: "Ayush Singh", lang: "Français", script: "latin" },
    { name: "Ayush Singh", lang: "Español", script: "latin" },
    { name: "アユシュ・シン", lang: "日本語", script: "japanese" },
    { name: "아유시 싱", lang: "한국어", script: "korean" }
  ];

  const skills = [
    "React.js", "Next.js", "TypeScript", "Node.js", "Express.js",
    "MongoDB", "PostgreSQL", "Redis", "Docker", "AWS","K8",
    "WebRTC", "CI/CD Automation", "UI/UX", "Creative Development"
  ];

  const loadingSteps = [
    'Initializing Systems...',
    'Loading Global Assets...',
    'Starting Developer Engine...',
    'Optimizing Performance Layers...',
    'Activating Creative Modules...',
    'Booting Neural Renderer...',
    'Finalizing Experience...',
    'Welcome to Ayush Singh Portfolio'
  ];

  useEffect(() => {
    const languageInterval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % nameTranslations.length);
    }, 350);
    return () => clearInterval(languageInterval);
  }, []);

  useEffect(() => {
    const skillInterval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 850);
    return () => clearInterval(skillInterval);
  }, []);

  useEffect(() => {
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 4 + 1.5, 100);
        const stepIndex = Math.floor((newProgress / 100) * (loadingSteps.length - 1));

        if (stepIndex !== currentStep) {
          currentStep = stepIndex;
          setLoadingText(loadingSteps[stepIndex]);
        }

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onLoadingComplete?.(), 800);
          }, 1200);
        }

        return newProgress;
      });
    }, 110);

    return () => clearInterval(progressInterval);
  }, [onLoadingComplete]);

  const currentTranslation = nameTranslations[currentLanguage];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-700 ${
        !isVisible ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background:
          'radial-gradient(circle at center, #050510 0%, #0a0f1f 40%, #0b1026 80%, #070712 100%)'
      }}
    >
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(55)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-16 left-20 w-40 h-40 border border-cyan-500/20 rotate-45 animate-spin"
             style={{ animationDuration: '22s' }} />
        <div className="absolute bottom-24 right-24 w-28 h-28 border border-violet-500/20 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-gradient-to-r from-cyan-500/10 to-violet-600/10 blur-xl animate-bounce"
             style={{ animationDuration: '3s' }} />
      </div>

      {/* Main content */}
      <div className="text-center z-10 max-w-5xl mx-auto px-6">
        
        {/* Animated Logo */}
        <div className="w-20 h-20 mx-auto mb-10 relative">
          <div className="absolute inset-0 border-2 border-cyan-500 rounded-xl animate-spin"
               style={{ animationDuration: '5s' }} />
          <div className="absolute inset-1 border border-violet-500/40 rounded-lg animate-pulse" />
          <div className="absolute inset-2 border border-blue-500/30 rounded animate-spin"
               style={{ animationDuration: '7s', animationDirection: 'reverse' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-extrabold bg-gradient-to-br from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              AS
            </span>
          </div>
        </div>

        {/* Name */}
        <div className="mb-6 h-28 flex items-center justify-center overflow-hidden">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-black transition-all duration-300"
            key={currentLanguage}
            style={{
              textShadow: '0 0 25px rgba(0, 255, 255, 0.4)',
              fontFamily: getOptimizedFont(currentTranslation.script)
            }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent animate-pulse">
              {currentTranslation.name}
            </span>
          </h1>
        </div>

        {/* Language */}
        <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-full text-cyan-300 text-sm backdrop-blur-sm">
          {currentTranslation.lang}
        </span>

        {/* Role */}
        <div className="mt-8 space-y-3">
          <h2 className="text-xl md:text-2xl text-white tracking-wide">
            Full Stack Developer • Backend Engineer • Creative Frontend Developer
          </h2>

          <p className="text-cyan-300 text-lg font-medium">
            Specializing in <span className="text-violet-400">{skills[currentSkill]}</span>
          </p>

          <div className="flex gap-3 justify-center flex-wrap mt-3">
            {["React", "Next.js", "Node.js", "Redis", "Docker", "AWS", "UI/UX"].map((tech, i) => (
              <span
                key={tech}
                className="px-4 py-1 text-sm bg-gradient-to-r from-cyan-400/20 to-violet-500/20 border border-cyan-400/30 rounded-full text-cyan-200 backdrop-blur-sm animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="my-10">
          <p className="text-gray-300 text-sm mb-3">{loadingText}</p>

          <div className="w-full max-w-md mx-auto">
            <div className="h-2 bg-gray-800/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-full transition-all duration-500 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
            </div>

            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>Loading Portfolio</span>
              <span className="text-cyan-300">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex justify-center gap-6 text-gray-400 text-sm mb-12">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Systems Online
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            Global Engine Ready
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            Portfolio Loading
          </div>
        </div>

        {/* Location */}
        <p className="text-gray-500 text-sm">
          Based in India • Available Worldwide
        </p>
      </div>

      {/* Background glow elements */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.2s' }} />
    </div>
  );
};

const getOptimizedFont = (script) => {
  const fontMap = {
    japanese: '"Noto Sans JP", sans-serif',
    korean: '"Noto Sans KR", sans-serif',
    latin: '"Inter", "Poppins", sans-serif'
  };
  return fontMap[script] || fontMap.latin;
};

export default PortfolioLoader;
