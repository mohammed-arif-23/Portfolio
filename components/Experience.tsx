'use client';

import { Calendar, MapPin, Award, Trophy, Users, Target } from 'lucide-react';
import { ScrollReveal, TextSplit, Float } from '@/components/reactbits';
import { forwardRef } from 'react';
import FadeSlideIn from './reactbits/FadeSlideIn';

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
    year: '2024'
  },
  {
    title: 'Code Debugging Master',
    description: '1st place at national-level technical symposium by Mahendra Institutions of Technology',
    icon: Award,
    year: '2024'
  },
  {
    title: 'Hackathon Team Leader',
    description: 'Led a team of six in the Smart India Hackathon',
    icon: Users,
    year: '2023'
  }
];

const Experience = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <FadeSlideIn duration={900}>
            <ScrollReveal duration={1.5} stagger={0.2} start="top 90%">
              <TextSplit 
                className="text-5xl md:text-6xl font-bold mb-4 text-white"
                animation="words"
                stagger={0.1}
                duration={1}
              >
                Experience & Achievements
              </TextSplit>
            </ScrollReveal>
          </FadeSlideIn>
          <FadeSlideIn duration={900} delay={100}>
            <ScrollReveal duration={1.5} stagger={0.2} start="top 90%" delay={0.2}>
              <TextSplit 
                className="text-xl text-gray-400 max-w-3xl mx-auto"
                animation="words"
                stagger={0.05}
                duration={0.8}
              >
                Building innovative solutions and winning competitions through dedication and expertise
              </TextSplit>
            </ScrollReveal>
          </FadeSlideIn>
        </div>

        <div className="space-y-16">
          {/* Experience Timeline */}
          <div className="space-y-8">
            <FadeSlideIn duration={900}>
              <ScrollReveal duration={1.5} stagger={0.2} start="top 90%">
                <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-3">
                  <Target className="w-8 h-8 text-white" />
                  <span>Professional Journey</span>
                </h3>
              </ScrollReveal>
            </FadeSlideIn>
            
            <div className="relative">
             
              {experiences.map((exp, i) => (
                <FadeSlideIn key={i} duration={900} delay={i * 120}>
                  <ScrollReveal animation="fadeLeft" duration={1.5} delay={i * 0.2} stagger={0.2} start="top 90%">
                    <Float y={5} duration={3} delay={i * 0.1}>
                      <div className={`p-8 glass-morphism-strong rounded-3xl hover-lift-3d group relative mb-12 transition-all duration-300 ${
                        exp.type === 'current' ? 'border-2 border-white/30' : ''
                      }`}>
                        {/* Timeline Dot */}
                        <div className="absolute -left-4 top-8 w-8 h-8 bg-white rounded-full border-4 border-black hidden md:block group-hover:scale-125 transition-transform duration-300"></div>
                        
                        {exp.type === 'current' && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-white text-black rounded-full text-xs font-medium">
                            Current
                          </div>
                        )}

                        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
                          <div className="flex-1">
                            <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
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
                              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0 group-hover:bg-gray-300 transition-colors"></div>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, skillIndex) => (
                            <span
                              key={skill}
                              className="px-4 py-2 bg-white/10 text-white rounded-full text-sm border border-white/20 hover:border-white/40 transition-all duration-200 hover:scale-105"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Float>
                  </ScrollReveal>
                </FadeSlideIn>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-8">
            <FadeSlideIn duration={900}>
              <ScrollReveal duration={1.5} stagger={0.2} start="top 90%">
                <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-3">
                  <Award className="w-8 h-8 text-white" />
                  <span>Awards & Recognition</span>
                </h3>
              </ScrollReveal>
            </FadeSlideIn>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((achievement, i) => (
                <FadeSlideIn key={i} duration={900} delay={i * 120}>
                  <ScrollReveal key={i} animation="scale" duration={1.5} delay={i * 0.1} stagger={0.2} start="top 90%" className="h-full">
                    <Float y={8} duration={3} delay={i * 0.2} className="h-full">
                      <div className="p-8 glass-morphism-strong rounded-3xl hover-lift-3d group relative overflow-hidden transition-all duration-300 h-full flex flex-col">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-bl-full"></div>
                        
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="p-4 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                            <achievement.icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">{achievement.year}</div>
                          </div>
                        </div>
                        
                        <h4 className="text-xl font-bold text-white mb-4 group-hover:text-gray-300 transition-colors">
                          {achievement.title}
                        </h4>
                        <p className="text-gray-300 leading-relaxed flex-grow">{achievement.description}</p>
                        
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </Float>
                  </ScrollReveal>
                </FadeSlideIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
Experience.displayName = 'Experience';
export default Experience;