import { useEffect, useState, useCallback } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [comets, setComets] = useState([]);
  const [pulsars, setPulsars] = useState([]);
  const [constellations, setConstellations] = useState([]);
  const [nebulas, setNebulas] = useState([]);

  // Generate different types of celestial objects
  const generateStars = useCallback(() => {
    const density = 15000; // Lower number = more dense
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / density
    );

    const starTypes = [
      { color: "#ffffff", class: "star-white" },
      { color: "#bae6fd", class: "star-blue" },
      { color: "#fef3c7", class: "star-yellow" },
      { color: "#fecaca", class: "star-red" },
    ];

    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      const type = starTypes[Math.floor(Math.random() * starTypes.length)];
      const size = Math.random() ** 2 * 4 + 0.5; // More small stars
      const isTwinkling = Math.random() > 0.3;
      const hasOrbit = Math.random() > 0.9;

      newStars.push({
        id: i,
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: type.color,
        className: type.class,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 3 + 1,
        orbitRadius: hasOrbit ? Math.random() * 20 + 5 : 0,
        orbitSpeed: hasOrbit ? Math.random() * 0.5 + 0.1 : 0,
        animationDuration: isTwinkling ? Math.random() * 4 + 2 : 0,
      });
    }

    setStars(newStars);
  }, []);

  const generateMeteors = useCallback(() => {
    const numberOfMeteors = 8;
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      const hasTrail = Math.random() > 0.3;
      const trailLength = hasTrail ? Math.floor(Math.random() * 3) + 2 : 0;

      newMeteors.push({
        id: i,
        size: Math.random() * 2 + 0.8,
        x: Math.random() * 100,
        y: Math.random() * 30,
        color: Math.random() > 0.7 ? "#60a5fa" : "#fef3c7",
        delay: Math.random() * 20,
        speed: Math.random() * 2 + 1,
        trailLength,
        direction: Math.random() > 0.5 ? "left" : "right",
      });
    }

    setMeteors(newMeteors);
  }, []);

  const generateComets = useCallback(() => {
    const numberOfComets = 3;
    const newComets = [];

    for (let i = 0; i < numberOfComets; i++) {
      const startX = Math.random() * 30 + 70;
      const startY = Math.random() * 30;
      const angle = Math.random() * 40 + 20;

      newComets.push({
        id: i,
        size: Math.random() * 1.5 + 0.5,
        startX,
        startY,
        angle,
        color: i === 0 ? "#a5f3fc" : i === 1 ? "#c7d2fe" : "#f0abfc",
        delay: Math.random() * 40 + 20,
        duration: Math.random() * 10 + 15,
        tailLength: Math.floor(Math.random() * 8) + 4,
      });
    }

    setComets(newComets);
  }, []);

  const generatePulsars = useCallback(() => {
    const numberOfPulsars = 5;
    const newPulsars = [];

    for (let i = 0; i < numberOfPulsars; i++) {
      const pulseType = Math.random() > 0.5 ? "expand" : "glow";

      newPulsars.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        baseSize: Math.random() * 8 + 3,
        pulseSpeed: Math.random() * 2 + 0.5,
        pulseIntensity: Math.random() * 0.5 + 0.3,
        color: pulseType === "expand" ? "#fde047" : "#22d3ee",
        pulseType,
        delay: Math.random() * 10,
      });
    }

    setPulsars(newPulsars);
  }, []);

  const generateConstellations = useCallback(() => {
    const numberOfConstellations = 4;
    const newConstellations = [];

    for (let i = 0; i < numberOfConstellations; i++) {
      const points = [];
      const numPoints = Math.floor(Math.random() * 6) + 3;
      const centerX = Math.random() * 60 + 20;
      const centerY = Math.random() * 60 + 20;
      const radius = Math.random() * 15 + 8;

      for (let j = 0; j < numPoints; j++) {
        const angle = (j * 2 * Math.PI) / numPoints + Math.random() * 0.5;
        points.push({
          x: centerX + Math.cos(angle) * radius + (Math.random() * 6 - 3),
          y: centerY + Math.sin(angle) * radius + (Math.random() * 6 - 3),
        });
      }

      newConstellations.push({
        id: i,
        points,
        color: i === 0 ? "#818cf8" : i === 1 ? "#34d399" : "#f472b6",
        glow: Math.random() > 0.5,
        pulseSpeed: Math.random() * 0.5 + 0.2,
      });
    }

    setConstellations(newConstellations);
  }, []);

  const generateNebulas = useCallback(() => {
    const numberOfNebulas = 2;
    const newNebulas = [];

    for (let i = 0; i < numberOfNebulas; i++) {
      newNebulas.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 200 + 100,
        color1: i === 0 ? "rgba(124, 58, 237, 0.1)" : "rgba(14, 165, 233, 0.1)",
        color2: i === 0 ? "rgba(139, 92, 246, 0.05)" : "rgba(56, 189, 248, 0.05)",
        rotation: Math.random() * 360,
        animationSpeed: Math.random() * 0.2 + 0.05,
      });
    }

    setNebulas(newNebulas);
  }, []);

  useEffect(() => {
    generateStars();
    generateMeteors();
    generateComets();
    generatePulsars();
    generateConstellations();
    generateNebulas();

    const handleResize = () => {
      generateStars();
      generateConstellations();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [generateStars, generateMeteors, generateComets, generatePulsars, generateConstellations, generateNebulas]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Nebula backgrounds */}
      {nebulas.map((nebula) => (
        <div
          key={`nebula-${nebula.id}`}
          className="nebula"
          style={{
            background: `radial-gradient(ellipse at center, ${nebula.color1} 0%, ${nebula.color2} 70%, transparent 100%)`,
            width: nebula.size + "px",
            height: nebula.size + "px",
            left: nebula.x + "%",
            top: nebula.y + "%",
            animationDuration: (1 / nebula.animationSpeed) + "s",
            transform: `translate(-50%, -50%) rotate(${nebula.rotation}deg)`,
          }}
        />
      ))}

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className={`absolute rounded-full ${star.className} ${star.animationDuration > 0 ? 'animate-pulse-subtle' : ''}`}
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            backgroundColor: star.color,
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
            boxShadow: `0 0 ${star.size * 3}px ${star.size}px ${star.color}40`,
            ...(star.orbitRadius > 0 && {
              animation: `orbit ${(1 / star.orbitSpeed) * 20}s linear infinite`,
              transformOrigin: `${star.x + star.orbitRadius}% ${star.y}%`,
            }),
          }}
        />
      ))}

      {/* Constellations */}
      {constellations.map((constellation) => (
        <div
          key={`constellation-${constellation.id}`}
          className="absolute"
          style={{
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Lines connecting stars */}
          <svg
            className="absolute w-full h-full"
            style={{ opacity: 0.15 }}
          >
            {constellation.points.map((point, index, array) => {
              const nextPoint = array[(index + 1) % array.length];
              return (
                <line
                  key={`line-${constellation.id}-${index}`}
                  x1={`${point.x}%`}
                  y1={`${point.y}%`}
                  x2={`${nextPoint.x}%`}
                  y2={`${nextPoint.y}%`}
                  stroke={constellation.color}
                  strokeWidth="1"
                  className={`${constellation.glow ? 'animate-pulse' : ''}`}
                  style={{
                    animationDuration: `${1 / constellation.pulseSpeed}s`,
                  }}
                />
              );
            })}
          </svg>

          {/* Constellation stars */}
          {constellation.points.map((point, index) => (
            <div
              key={`constellation-star-${constellation.id}-${index}`}
              className="absolute rounded-full"
              style={{
                width: "6px",
                height: "6px",
                left: point.x + "%",
                top: point.y + "%",
                backgroundColor: constellation.color,
                boxShadow: `0 0 12px ${constellation.color}`,
                animation: `pulse ${1 / constellation.pulseSpeed}s ease-in-out infinite`,
                animationDelay: `${index * 0.1}s`,
              }}
            />
          ))}
        </div>
      ))}

      {/* Meteors */}
      {meteors.map((meteor) => (
        <div
          key={`meteor-${meteor.id}`}
          className="absolute"
          style={{
            left: meteor.x + "%",
            top: meteor.y + "%",
            animation: `meteorFall${meteor.direction === 'right' ? 'Right' : 'Left'} ${meteor.speed}s linear infinite`,
            animationDelay: meteor.delay + "s",
          }}
        >
          {/* Meteor head */}
          <div
            className="absolute rounded-full"
            style={{
              width: meteor.size + "px",
              height: meteor.size + "px",
              backgroundColor: meteor.color,
              boxShadow: `0 0 ${meteor.size * 4}px ${meteor.size * 2}px ${meteor.color}`,
            }}
          />
          {/* Meteor trail */}
          {Array.from({ length: meteor.trailLength }).map((_, index) => (
            <div
              key={`trail-${meteor.id}-${index}`}
              className="absolute rounded-full"
              style={{
                width: meteor.size * (1 - index * 0.3) + "px",
                height: meteor.size * (1 - index * 0.3) + "px",
                left: `-${(index + 1) * 15}px`,
                backgroundColor: meteor.color,
                opacity: 0.5 - index * 0.1,
              }}
            />
          ))}
        </div>
      ))}

      {/* Comets */}
      {comets.map((comet) => (
        <div
          key={`comet-${comet.id}`}
          className="absolute"
          style={{
            left: comet.startX + "%",
            top: comet.startY + "%",
            animation: `cometMove ${comet.duration}s ease-in infinite`,
            animationDelay: comet.delay + "s",
            transform: `rotate(${comet.angle}deg)`,
            transformOrigin: "0 0",
          }}
        >
          {/* Comet head */}
          <div
            className="absolute rounded-full"
            style={{
              width: comet.size * 3 + "px",
              height: comet.size * 3 + "px",
              backgroundColor: comet.color,
              boxShadow: `0 0 ${comet.size * 6}px ${comet.size * 3}px ${comet.color}`,
            }}
          />
          {/* Comet tail */}
          {Array.from({ length: comet.tailLength }).map((_, index) => (
            <div
              key={`comet-tail-${comet.id}-${index}`}
              className="absolute rounded-full"
              style={{
                width: comet.size * (2 - index * 0.2) + "px",
                height: comet.size * (2 - index * 0.2) + "px",
                left: `-${(index + 1) * 20}px`,
                backgroundColor: comet.color,
                opacity: 0.3 - index * 0.03,
                filter: "blur(1px)",
              }}
            />
          ))}
        </div>
      ))}

      {/* Pulsars */}
      {pulsars.map((pulsar) => (
        <div
          key={`pulsar-${pulsar.id}`}
          className="absolute"
          style={{
            left: pulsar.x + "%",
            top: pulsar.y + "%",
            animation: pulsar.pulseType === "expand" 
              ? `pulseExpand ${pulsar.pulseSpeed}s ease-in-out infinite` 
              : `pulseGlow ${pulsar.pulseSpeed}s ease-in-out infinite`,
            animationDelay: pulsar.delay + "s",
          }}
        >
          {/* Pulsar core */}
          <div
            className="absolute rounded-full"
            style={{
              width: pulsar.baseSize + "px",
              height: pulsar.baseSize + "px",
              backgroundColor: pulsar.color,
              boxShadow: `0 0 ${pulsar.baseSize * 2}px ${pulsar.baseSize}px ${pulsar.color}60`,
              transform: "translate(-50%, -50%)",
            }}
          />
          {/* Pulsar wave */}
          {pulsar.pulseType === "expand" && (
            <div
              className="absolute rounded-full border"
              style={{
                width: pulsar.baseSize + "px",
                height: pulsar.baseSize + "px",
                borderColor: pulsar.color,
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
        </div>
      ))}

      {/* Shooting stars effect on hover */}
      <div className="absolute inset-0 shooting-star-trigger" />
    </div>
  );
};