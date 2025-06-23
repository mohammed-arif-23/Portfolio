'use client';

import { MapPin, Calendar, Award, Code, Zap } from 'lucide-react';
import { ScrollReveal, TextSplit, Float } from '@/components/reactbits';
import { forwardRef, useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import FadeSlideIn from './reactbits/FadeSlideIn';

const About = forwardRef<HTMLDivElement>((props, ref) => {
  const [visible, setVisible] = useState(false);
  const localRef = useRef<HTMLDivElement>(null);
  const sectionRef = (ref as React.RefObject<HTMLDivElement>) || localRef;

  useEffect(() => {
    const onScroll = () => {
      if (!visible && sectionRef.current) {
        const node = sectionRef.current;
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          setVisible(true);
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionRef, visible]);

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{ marginTop: '60px' }}
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div>
          <div className="text-center mb-16">
            <FadeSlideIn duration={900}>
              <ScrollReveal duration={1.5} stagger={0.2} start="top 90%">
              <TextSplit 
                className="text-5xl md:text-6xl font-bold mb-4 text-white"
                animation="words"
                stagger={0.1}
                duration={1}
              >
                About Me
              </TextSplit>
              <TextSplit 
                className="text-xl text-gray-400 max-w-3xl mx-auto"
                animation="words"
                stagger={0.05}
                duration={0.8}
              >
                Passionate developer crafting the future of web experiences
              </TextSplit>
            </ScrollReveal>
            </FadeSlideIn>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-stretch min-h-full">
            {/* Left Column - Main Content */}
            <div className="space-y-8 flex-1 min-h-full flex flex-col justify-between">
              <FadeSlideIn duration={900}>
                <ScrollReveal animation="fadeLeft" duration={1.5} stagger={0.2} start="top 90%">
                <Float y={5} duration={3}>
                  <div className="p-8 glass-morphism-strong rounded-3xl hover-lift-3d transition-all duration-300">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-white/10 rounded-xl">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Full Stack Excellence</h3>
                    </div>
                    <TextSplit 
                      className="text-lg text-gray-300 leading-relaxed mb-6"
                      animation="words"
                      stagger={0.03}
                      duration={0.8}
                    >
                      I'm a passionate Full Stack Web Developer with extensive experience in creating 
                      scalable web applications using modern technologies. My expertise spans across 
                      Next.js, Node.js, PHP, MySQL, and JavaScript, with a focus on delivering 
                      exceptional user experiences. I also leverage AI and Machine Learning techniques to solve real-world problems and build innovative solutions.
                    </TextSplit>
                    <TextSplit 
                      className="text-lg text-gray-300 leading-relaxed"
                      animation="words"
                      stagger={0.03}
                      duration={0.8}
                    >
                      I specialize in responsive design, performance optimization, and RESTful API 
                      development. With a proven track record of enhancing user experiences through 
                      strong problem-solving skills, I'm committed to delivering high-quality solutions.
                    </TextSplit>
                  </div>
                </Float>
              </ScrollReveal>
              </FadeSlideIn>

              <FadeSlideIn duration={900} delay={100}>
                <ScrollReveal animation="fadeLeft" duration={1.5} stagger={0.2} start="top 90%" delay={0.2}>
                <Float y={5} duration={3} delay={0.5}>
                  <div className="p-6 glass-morphism-strong rounded-2xl hover-lift-3d transition-all duration-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Recognition</h3>
                    </div>
                    <TextSplit 
                      className="text-lg text-gray-300 leading-relaxed"
                      animation="words"
                      stagger={0.05}
                      duration={0.8}
                    >
                      Proven expertise in web development, problem-solving, and the application of AI/ML techniques to deliver impactful results.
                    </TextSplit>
                  </div>
                </Float>
              </ScrollReveal>
              </FadeSlideIn>
            </div>

            {/* Right Column - Info Cards */}
            <div className="space-y-6 flex-1 min-h-full flex flex-col justify-between">
              <FadeSlideIn duration={900}>
                <ScrollReveal animation="fadeRight" duration={1.5} stagger={0.2} start="top 90%">
                <Float y={5} duration={3} delay={0.1}>
                  <div className="p-6 glass-morphism-strong rounded-2xl hover-lift-3d transition-all duration-300 group">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p className="text-white font-medium">Salem, Tamil Nadu, India</p>
                      </div>
                    </div>
                  </div>
                </Float>
              </ScrollReveal>
              </FadeSlideIn>

              <FadeSlideIn duration={900} delay={100}>
                <ScrollReveal animation="fadeRight" duration={1.5} stagger={0.2} start="top 90%" delay={0.2}>
                <Float y={5} duration={3} delay={0.2}>
                  <div className="p-6 glass-morphism-strong rounded-2xl hover-lift-3d transition-all duration-300 group">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Education</p>
                        <p className="text-white font-medium">B.Tech IT (2023-2027)</p>
                      </div>
                    </div>
                  </div>
                </Float>
              </ScrollReveal>
              </FadeSlideIn>

              <FadeSlideIn duration={900} delay={200}>
                <ScrollReveal animation="fadeRight" duration={1.5} stagger={0.2} start="top 90%" delay={0.4}>
                <Float y={5} duration={3} delay={0.3}>
                  <div className="p-6 glass-morphism-strong rounded-2xl hover-lift-3d transition-all duration-300">
                    <h3 className="text-xl font-bold text-white mb-4">Languages Known</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['English', 'Urdu', 'Tamil', 'Hindi'].map((lang, index) => (
                        <div 
                          key={lang} 
                          className="px-4 py-2 bg-white/10 rounded-lg text-center text-gray-300 text-sm hover:bg-white/20 transition-colors"
                        >
                          {lang}
                        </div>
                      ))}
                    </div>
                  </div>
                </Float>
              </ScrollReveal>
              </FadeSlideIn>

              <FadeSlideIn duration={900} delay={300}>
                <ScrollReveal animation="fadeRight" duration={1.5} stagger={0.2} start="top 90%" delay={0.6}>
                <Float y={5} duration={3} delay={0.4}>
                  <div className="p-6 glass-morphism-strong rounded-2xl hover-lift-3d transition-all duration-300">
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
                </Float>
              </ScrollReveal>
              </FadeSlideIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
About.displayName = 'About';
export default About;