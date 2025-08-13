'use client';

import { useState, forwardRef, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, User, Sparkles } from 'lucide-react';
import { ScrollReveal, TextSplit, Float } from '@/components/reactbits';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Contact = forwardRef<HTMLDivElement>((props, ref) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const refreshTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
    setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
    setIsSubmitting(false);
    setTimeout(() => {
      if (typeof window !== 'undefined' && ScrollTrigger) {
        try {
          ScrollTrigger.refresh();
        } catch (e) {
          // Ignore errors caused by removed nodes
        }
      }
    }, 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        if (typeof window !== 'undefined' && ScrollTrigger) {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      setTimeout(() => {
        if (typeof window !== 'undefined' && ScrollTrigger) {
          try {
            ScrollTrigger.refresh();
          } catch (e) {}
        }
      }, 300);
    };

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal duration={1.5} stagger={0.2} start="top 90%">
            <TextSplit 
              className="text-5xl md:text-6xl font-bold mb-4 text-white"
              animation="words"
              stagger={0.1}
              duration={1}
            >
              Let's Create Together
            </TextSplit>
          </ScrollReveal>
          
          <ScrollReveal duration={1.5} stagger={0.2} start="top 90%" delay={0.2}>
            <TextSplit 
              className="text-xl text-gray-400 max-w-3xl mx-auto"
              animation="words"
              stagger={0.05}
              duration={0.8}
            >
              Ready to bring your vision to life? Let's discuss your next groundbreaking project
            </TextSplit>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <ScrollReveal animation="fadeLeft" duration={1.5} stagger={0.2} start="top 90%">
              <Float y={5} duration={3}>
                <div className="p-8 glass-morphism-strong glass-dim rounded-3xl hover-lift-3d transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-white/10 rounded-2xl">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Get In Touch</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <ScrollReveal animation="fadeLeft" duration={1.5} stagger={0.2} start="top 90%" delay={0.1}>
                      <div className="flex items-center space-x-4 p-4 glass-morphism glass-dim rounded-xl transition-colors group">
                        <div className="p-3 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <a href='mailto:mohammedarif2303@gmail.com'>
                          <div>
                            <p className="text-gray-400 text-sm">Email</p>
                            <p className="text-white font-medium">mohammedarif2303@gmail.com</p>
                          </div>
                        </a>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal animation="fadeLeft" duration={1.5} stagger={0.2} start="top 90%" delay={0.2}>
                      <div className="flex items-center space-x-4 p-4 glass-morphism glass-dim rounded-xl transition-colors group">
                        <div className="p-3 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <a href='tel:+917904645033'>
                          <div>
                            <p className="text-gray-400 text-sm">Phone</p>
                            <p className="text-white font-medium">+91 7904645033</p>
                          </div>
                        </a>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal animation="fadeLeft" duration={1.5} stagger={0.2} start="top 90%" delay={0.3}>
                      <div className="flex items-center space-x-4 p-4 glass-morphism glass-dim rounded-xl transition-colors group">
                        <div className="p-3 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Location</p>
                          <p className="text-white font-medium">Salem, Tamil Nadu, India</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              </Float>
            </ScrollReveal>

            <ScrollReveal animation="fadeLeft" duration={1.5} stagger={0.2} start="top 90%" delay={0.2}>
              <Float y={5} duration={3} delay={0.5}>
                <div className="p-8 glass-morphism-strong glass-dim rounded-3xl hover-lift-3d transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-white/10 rounded-2xl">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Why Choose Me?</h3>
                  </div>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <span>Skilled Full Stack Developer in Next.js, MERN, and AI/ML.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <span>Crafts responsive, user-focused web applications with performance optimization.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <span>Creative thinker driving dynamic, efficient solutions for real-world challenges.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <span>Collaborative approach with clear communication</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <span>Commitment to quality and timely delivery</span>
                    </li>
                  </ul>
                </div>
              </Float>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <ScrollReveal animation="fadeRight" duration={1.5} stagger={0.2} start="top 90%" className="space-y-8">
            <Float y={5} duration={3} delay={0.3}>
              <div className="p-8 glass-morphism-strong glass-dim rounded-3xl hover-lift-3d transition-all duration-300 flex flex-col">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-white/10 rounded-2xl">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Contact Me</h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6 flex flex-col flex-grow">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-3 text-lg">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 glass-morphism glass-dim border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300 hover:border-white/30"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-3 text-lg">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 glass-morphism glass-dim border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300 hover:border-white/30"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white font-medium mb-3 text-lg">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={11}
                      className="w-full px-6 py-4 glass-morphism glass-dim border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300 resize-none hover:border-white/30"
                      placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                    />
                  </div>

                  <div className="flex-grow" />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-3 px-8 py-4 glass-morphism btn-glass rounded-2xl font-medium transition-all duration-300 hover-lift-3d focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
                {status === 'success' && (
                  <div className="mt-4 text-green-400 text-center">Thank you! Your message has been sent.</div>
                )}
                {status === 'error' && (
                  <div className="mt-4 text-red-400 text-center">Sorry, something went wrong. Please try again later.</div>
                )}
              </div>
            </Float>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
});
Contact.displayName = 'Contact';
export default Contact;