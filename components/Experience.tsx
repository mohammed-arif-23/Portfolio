'use client';

import { useRef } from 'react';
import { Calendar, MapPin, Award, Trophy, Users, Target } from 'lucide-react';
import { useSequentialScrollAnimation } from '../hooks/useSequentialScrollAnimation';

const experiences = [
  {
    title: 'Full Stack Web Developer',
    company: 'AVS Engineering College',
    location: 'Salem',
    period: 'Current',
    description: [
      'Developed and deployed web-based solutions utilizing PHP, MySQL, and JavaScript',
      'Built RESTful APIs to integrate frontend functionality with backend logic',
      'Optimized database queries, enhancing overall system performance by 40%',
      'Collaborated with UI/UX team to design responsive layouts that improved user experience'
    ],
    skills: ['PHP', 'MySQL', 'JavaScript', 'RESTful APIs', 'Performance Optimization'],
    type: 'current'
  },
  {
    title: 'Front End Web Developer',
    company: 'Sakthi Kailash Women\'s College',
    location: 'Salem',
    period: 'Previous',
    description: [
      'Reduced load times by 60% through optimizing HTML, CSS, and JavaScript code',
      'Applied responsive design techniques for seamless mobile device experience',
      'Enhanced interactivity using AJAX for dynamic content loading',
      'Implemented modern CSS animations and transitions'
    ],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'AJAX', 'Responsive Design'],
    type: 'previous'
  },
  {
    title: 'Full Stack Web Developer',
    company: 'AVS College of Arts and Science',
    location: 'Salem',
    period: 'Previous',
    description: [
      'Built REST APIs to support frontend and backend integration',
      'Improved UI responsiveness and implemented new SEO-friendly designs',
      'Developed custom CMS solutions for content management'
    ],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'REST APIs', 'SEO'],
    type: 'previous'
  }
];

const achievements = [
  {
    title: 'Web Development Champion',
    description: '1st place at national level technical symposium by KSR College of Technology',
    icon: Trophy,
    color: 'from-yellow-400 to-orange-500',
    year: '2024'
  },
  {
    title: 'Code Debugging Master',
    description: '1st place at national-level technical symposium by Mahendra Institutions of Technology',
    icon: Award,
    color: 'from-blue-400 to-purple-500',
    year: '2024'
  },
  {
    title: 'Hackathon Team Leader',
    description: 'Led a team of six in the Smart India Hackathon',
    icon: Users,
    color: 'from-green-400 to-teal-500',
    year: '2023'
  }
];

export default function Experience() {
  const experienceRef = useRef<HTMLDivElement>(null);

  useSequentialScrollAnimation();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Experience & Achievements
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Building innovative solutions and winning competitions through dedication and expertise
          </p>
        </div>

        <div ref={experienceRef} className="space-y-16">
          {/* Experience Timeline */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-3">
              <Target className="w-8 h-8 text-blue-400" />
              <span>Professional Journey</span>
            </h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5  hidden md:block"></div>
              
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="experience-card animate-on-scroll opacity-0 relative mb-12"
                >
                  <div className={`p-8 liquid-glass-card rounded-3xl hover-lift-3d group relative ${
                    exp.type === 'current' ? 'border-2 border-blue-500/30' : ''
                  }`}>
                    {/* Timeline Dot */}
                    <div className="absolute -left-4 top-8 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-slate-900 hidden md:block group-hover:scale-125 transition-transform duration-300"></div>
                    
                    {exp.type === 'current' && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-xs font-medium text-white">
                        Current
                      </div>
                    )}

                    <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          {exp.title}
                        </h4>
                        <p className="text-xl text-gray-300 mb-2">{exp.company}</p>
                        <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="text-gray-300 flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0 group-hover:bg-purple-400 transition-colors"></div>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30 hover:border-blue-400 transition-colors hover:scale-105 transform duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-3">
              <Award className="w-8 h-8 text-yellow-400" />
              <span>Awards & Recognition</span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((achievement, i) => (
                <div
                  key={i}
                  className="experience-card animate-on-scroll opacity-0 p-8 liquid-glass-card rounded-3xl hover-lift-3d group relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${achievement.color} opacity-10 rounded-bl-full`}></div>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-4 bg-gradient-to-r ${achievement.color} bg-opacity-20 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">{achievement.year}</div>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-500 group-hover:bg-clip-text transition-all duration-300">
                    {achievement.title}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">{achievement.description}</p>
                  
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}