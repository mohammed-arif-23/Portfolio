'use client';

import { useEffect, useRef } from 'react';
import { MapPin, Calendar, Award, Code, Zap } from 'lucide-react';
import { useSequentialScrollAnimation } from '../hooks/useSequentialScrollAnimation';

export default function About() {
  useSequentialScrollAnimation();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div>
          <div className="text-center mb-16">
            <h2 className="animate-on-scroll opacity-0 text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="animate-on-scroll opacity-0 text-xl text-gray-400 max-w-3xl mx-auto">
              Passionate developer crafting the future of web experiences
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-stretch min-h-full">
            {/* Left Column - Main Content */}
            <div className="space-y-8 flex-1 min-h-full flex flex-col justify-between">
              <div className="animate-on-scroll opacity-0 p-8 liquid-glass-card rounded-3xl hover-lift-3d">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <Code className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Full Stack Excellence</h3>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  I'm a passionate Full Stack Web Developer with extensive experience in creating 
                  scalable web applications using modern technologies. My expertise spans across 
                  Next.js, Node.js, PHP, MySQL, and JavaScript, with a focus on delivering 
                  exceptional user experiences. I also leverage AI and Machine Learning techniques to solve real-world problems and build innovative solutions.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  I specialize in responsive design, performance optimization, and RESTful API 
                  development. With a proven track record of enhancing user experiences through 
                  strong problem-solving skills, I'm committed to delivering high-quality solutions.
                </p>
              </div>

              <div className="animate-on-scroll opacity-0 p-6 liquid-glass-card rounded-2xl hover-lift-3d">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Award className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Recognition</h3>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Proven expertise in web development, problem-solving, and the application of AI/ML techniques to deliver impactful results.
                </p>
              </div>
            </div>

            {/* Right Column - Info Cards */}
            <div className="space-y-6 flex-1 min-h-full flex flex-col justify-between">
              <div className="animate-on-scroll opacity-0 p-6 liquid-glass-card rounded-2xl hover-lift-3d group">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white font-medium">Salem, Tamil Nadu, India</p>
                  </div>
                </div>
              </div>

              <div className="animate-on-scroll opacity-0 p-6 liquid-glass-card rounded-2xl hover-lift-3d group">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors">
                    <Calendar className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Education</p>
                    <p className="text-white font-medium">B.Tech IT (2023-2027)</p>
                  </div>
                </div>
              </div>

              <div className="animate-on-scroll opacity-0 p-6 liquid-glass-card rounded-2xl hover-lift-3d">
                <h3 className="text-xl font-bold text-white mb-4">Languages Known</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['English', 'Urdu', 'Tamil', 'Hindi'].map((lang, index) => (
                    <div 
                      key={lang} 
                      className="px-4 py-2 bg-white/10 rounded-lg text-center text-gray-300 text-sm hover:bg-white/20 transition-colors card-3d"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-on-scroll opacity-0 p-6 liquid-glass-card rounded-2xl hover-lift-3d">
                <h3 className="text-xl font-bold text-white mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Projects Completed</span>
                    <span className="text-white font-bold">10+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Technologies Mastered</span>
                    <span className="text-white font-bold">20+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Awards Won</span>
                    <span className="text-white font-bold">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}