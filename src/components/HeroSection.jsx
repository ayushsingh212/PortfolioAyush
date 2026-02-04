import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from "lucide-react";
import * as THREE from 'three';

export const HeroSection = ({ isDarkMode = true }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const frameRef = useRef(null);
  const meshesRef = useRef([]);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [textGlitch, setTextGlitch] = useState(false);

  const themeColors = {
    dark: {
      geometryColors: [0x00eaff, 0x3b82f6, 0x7c3aed, 0x06b6d4, 0x5b21b6],
      emissiveColors: [0x0088ff, 0x3b82f6, 0x7c3aed, 0x0ea5e9, 0x4c1d95],
      textColors: 'text-white',
      subtextColors: 'text-gray-300',
      scrollText: 'text-gray-400'
    },
    light: {
      geometryColors: [0x2563eb, 0x4f46e5, 0x0ea5e9],
      emissiveColors: [0x60a5fa, 0xa78bfa, 0x38bdf8],
      textColors: 'text-gray-900',
      subtextColors: 'text-gray-700',
      scrollText: 'text-gray-600'
    }
  };

  const currentTheme = isDarkMode ? themeColors.dark : themeColors.light;

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const geometries = [
      new THREE.OctahedronGeometry(0.3),
      new THREE.TetrahedronGeometry(0.4),
      new THREE.IcosahedronGeometry(0.25),
      new THREE.DodecahedronGeometry(0.35),
      new THREE.ConeGeometry(0.3, 0.8, 6),
      new THREE.CylinderGeometry(0.2, 0.4, 0.6, 8),
      new THREE.TorusGeometry(0.3, 0.1, 8, 16),
      new THREE.TorusKnotGeometry(0.2, 0.08, 64, 8),
    ];

    const materials = currentTheme.geometryColors.map((color, index) =>
      new THREE.MeshStandardMaterial({
        color: color,
        emissive: currentTheme.emissiveColors[index % currentTheme.emissiveColors.length],
        emissiveIntensity: 0.35,
        metalness: 0.85,
        roughness: 0.2,
        transparent: true,
        opacity: 0.85
      })
    );

    const meshes = [];
    for (let i = 0; i < 16; i++) {
      const geometry = geometries[i % geometries.length];
      const material = materials[i % materials.length];
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12 - 6
      );

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      mesh.userData = {
        initialPosition: mesh.position.clone(),
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.03,
          y: (Math.random() - 0.5) * 0.03,
          z: (Math.random() - 0.5) * 0.03
        },
        floatSpeed: Math.random() * 0.012 + 0.008,
        floatRange: Math.random() * 3 + 1.5,
        scaleBase: Math.random() * 0.3 + 0.8
      };

      scene.add(mesh);
      meshes.push(mesh);
    }

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 220;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 50;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 20;

      const color = new THREE.Color(currentTheme.geometryColors[i % currentTheme.geometryColors.length]);
      particleColors[i3] = color.r;
      particleColors[i3 + 1] = color.g;
      particleColors[i3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLights = [];
    const lightColors = currentTheme.geometryColors.slice(0, 4);

    lightColors.forEach((color, index) => {
      const light = new THREE.PointLight(color, 1.3, 100);
      const angle = (index / lightColors.length) * Math.PI * 2;
      light.position.set(
        Math.cos(angle) * 15,
        Math.sin(angle) * 10,
        Math.sin(angle) * 15
      );
      scene.add(light);
      pointLights.push({ light, angle: angle, radius: 15 });
    });

    camera.position.z = 12;

    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const animate = (time) => {
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += mesh.userData.rotationSpeed.x;
        mesh.rotation.y += mesh.userData.rotationSpeed.y;
        mesh.rotation.z += mesh.userData.rotationSpeed.z;

        const floatOffset = Math.sin(time * 0.001 * mesh.userData.floatSpeed) * mesh.userData.floatRange;
        mesh.position.y = mesh.userData.initialPosition.y + floatOffset;

        mesh.position.x =
          mesh.userData.initialPosition.x +
          Math.cos(time * 0.0004 + index) * 2 +
          mouseRef.current.x * 0.6;

        mesh.scale.setScalar(mesh.userData.scaleBase * (1 + Math.sin(time * 0.003 + index) * 0.15));
      });

      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time * 0.001 + i) * 0.008;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      camera.position.x = mouseRef.current.x * 0.3;
      camera.position.y = mouseRef.current.y * 0.2;
      camera.lookAt(0, 0, 0);

      pointLights.forEach((l, index) => {
        const t = time * 0.001 + l.angle;
        l.light.position.x = Math.sin(t) * l.radius * 1.2;
        l.light.position.y = Math.cos(t * 0.7) * l.radius;
        l.light.intensity = 1.2 + Math.sin(time * 0.002 + index) * 0.2;
      });

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);

    frameRef.current = requestAnimationFrame(animate);
    setTimeout(() => setIsLoaded(true), 450);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (mountRef.current && renderer.domElement)
        mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [isDarkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextGlitch(true);
      setTimeout(() => setTextGlitch(false), 150);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <div ref={mountRef} className="absolute inset-0 pointer-events-none" />

      <div className="container max-w-4xl mx-auto text-center relative z-10">
        <div className="space-y-8">

          {/* NAME */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            <span
              className={`inline-block transition-all duration-1000 ${currentTheme.textColors} ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Hi, I'm
            </span>

            <span
              className={`inline-block ml-4 transition-all duration-1000 ${
                isLoaded ? 'opacity-100' : 'opacity-0 translate-y-12'
              }`}
              style={{
                background: 'linear-gradient(90deg, #00eaff, #3b82f6, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 25px rgba(0, 238, 255, 0.5)'
              }}
            >
              Ayush
            </span>

            <span
              className={`inline-block ml-2 transition-all duration-1000 ${
                isLoaded ? 'opacity-100' : 'opacity-0 translate-y-14'
              }`}
              style={{
                background: 'linear-gradient(90deg, #3b82f6, #7c3aed, #9333ea)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 25px rgba(147, 51, 234, 0.5)'
              }}
            >
              Singh
            </span>
          </h1>

          {/* SUBTEXT */}
          <p
            className={`text-lg md:text-2xl ${currentTheme.subtextColors} transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            Full Stack Developer • Backend Engineer • Creative Frontend Specialist  
            <br />
            I build immersive web experiences powered by{' '}
            <span className="text-cyan-400 font-semibold">3D animations</span> and{' '}
            <span className="text-violet-400 font-semibold">interactive UIs</span>.
          </p>

          {/* CTA */}
          <div
            className={`transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a
              href="#projects"
              className="group inline-flex items-center px-8 py-4 text-white font-bold text-lg rounded-full transition-all"
              style={{
                background:
                  'linear-gradient(90deg, #00eaff, #3b82f6, #7c3aed)',
                boxShadow:
                  '0 0 20px rgba(0, 238, 255, 0.4), 0 0 40px rgba(124, 58, 237, 0.2)',
                backgroundSize: '200% 200%',
                animation: 'gradient-flow 3s infinite'
              }}
            >
              View My Work
              <ArrowDown className="ml-3 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 transition-all ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        <span className={`block text-sm ${currentTheme.scrollText} mb-3`}>
          Scroll to explore
        </span>

        <ArrowDown
          className="w-6 h-6 text-cyan-400 animate-bounce"
          style={{ filter: 'drop-shadow(0 0 8px rgba(0, 238, 255, 0.6))' }}
        />
      </div>

      <style>{`
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};
