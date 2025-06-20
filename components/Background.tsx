'use client';
import { useEffect, useState } from 'react';

export default function Background() {
  const [particles, setParticles] = useState<
    { left: string; top: string; animationDelay: string }[]
  >([]);

  useEffect(() => {
    // Generate random positions and delays for particles on the client only
    const generated = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 8}s`,
    }));
    setParticles(generated);
  }, []);

  return (
    <>
      {/* 3D Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className={`floating-particle particle-${(i % 3) + 1} w-2 h-2 bg-blue-400/30 absolute animate-particle-move`}
            style={particle}
          />
        ))}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0" >
        <div className="floating-element absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="floating-element absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="floating-element absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="floating-element absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* 3D Grid Background */}
      <div className="absolute inset-0 parallax-layer z-0" data-speed="0.3">
        {/* Animated, premium grid lines (no overlay) */}
        <div className="absolute inset-0 animate-grid-lines bg-[linear-gradient(90deg,rgba(59,130,246,0.13)_0%,rgba(168,85,247,0.13)_50%,rgba(236,72,153,0.13)_100%)],bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:100%_100%,60px_60px,60px_60px] opacity-25 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Floating 3D Elements */}
      <div className="absolute top-1/4 left-10 floating-element z-0">
        <div className="w-6 h-6 bg-blue-400/60 rounded-lg rotate-45 animate-spin-slow"></div>
      </div>
      <div className="absolute top-1/3 right-20 floating-element z-0">
        <div className="w-8 h-8 bg-purple-400/60 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute bottom-1/4 left-1/4 floating-element z-0">
        <div className="w-5 h-5 bg-pink-400/60 rounded-full animate-bounce"></div>
      </div>
      <div className="absolute top-2/3 right-1/3 floating-element z-0">
        <div className="w-4 h-4 bg-cyan-400/60 rounded-lg animate-pulse"></div>
      </div>
    </>
  );
} 