'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = sectionRef.current?.querySelector('.contact-title');
      const subtitle = sectionRef.current?.querySelector('.contact-subtitle');
      const heading = sectionRef.current?.querySelector('.contact-heading');
      const contactCards = sectionRef.current?.querySelectorAll('.contact-card');
      const whyItems = sectionRef.current?.querySelectorAll('.why-item');
      const formElements = sectionRef.current?.querySelectorAll('.form-element');
      const submitButton = sectionRef.current?.querySelector('.submit-button');
      
      // Set initial states with blur for all elements
      const allElements = [title, subtitle, heading, submitButton, ...Array.from(contactCards || []), ...Array.from(whyItems || []), ...Array.from(formElements || [])].filter(Boolean);
      
      if (allElements.length > 0) {
        gsap.set(allElements, {
          opacity: 0,
          filter: 'blur(10px)',
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        },
      });

      // Animate title
      if (title) {
        tl.fromTo(
          title,
          { opacity: 0, y: 50, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
          0
        );
      }

      // Animate subtitle
      if (subtitle) {
        tl.fromTo(
          subtitle,
          { opacity: 0, y: 30, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
          0.2
        );
      }

      // Animate heading
      if (heading) {
        tl.fromTo(
          heading,
          { opacity: 0, x: -30, filter: 'blur(10px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
          0.3
        );
      }

      // Animate contact cards
      if (contactCards && contactCards.length > 0) {
        tl.fromTo(
          contactCards,
          { opacity: 0, x: -40, filter: 'blur(10px)' },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.1
          },
          0.4
        );
      }

      // Animate why items
      if (whyItems && whyItems.length > 0) {
        tl.fromTo(
          whyItems,
          { opacity: 0, x: -20, filter: 'blur(10px)' },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 0.4,
            ease: 'power2.out',
            stagger: 0.08
          },
          0.6
        );
      }

      // Animate form elements
      if (formElements && formElements.length > 0) {
        tl.fromTo(
          formElements,
          { opacity: 0, y: 30, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.1
          },
          0.5
        );
      }

      // Animate submit button
      if (submitButton) {
        tl.fromTo(
          submitButton,
          { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'back.out(1.7)' },
          0.9
        );
      }
      
      // Refresh ScrollTrigger to ensure all triggers are properly set up
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({ 
          success: true, 
          message: result.message || 'Message sent successfully!' 
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({ 
          success: false, 
          message: result.error || 'Failed to send message. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ 
        success: false, 
        message: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-40 px-4 md:px-8 lg:px-20 bg-brand-dark">
      <div className="layout-grid">
        <div className="col-span-12">
          <div className="text-center mb-20">
            <h2 className="contact-title heading-96 text-brand0dark mb-10 font-bold">
              Let's Create Together
            </h2>
            <p className="contact-subtitle body-20 text-brand0dark max-w-2xl mx-auto leading-relaxed">
              Ready to bring your vision to life? Let's discuss your next groundbreaking project
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info - Make equal height with flex */}
            <div className="flex flex-col">
              <div className="flex-grow space-y-10">
                <div>
                  <h3 className="contact-heading heading-26 text-brand0dark mb-10 font-bold">Get In Touch</h3>
                </div>

                <div className="space-y-6">
                  <div className="contact-card px-8 py-4 border-1 border-brand-light rounded-3xl bg-brand-light/10 hover:bg-brand-light/20 transition-all">
                    <p className="heading-26 text-brand  text-brand-dark mb-3 font-bold">Email</p>
                    <a href="mailto:mohammedarif2303@gmail.com" className="body-20 text-brand0dark hover:text-brand-accent transition-colors break-all">
                      mohammedarif2303@gmail.com
                    </a>
                  </div>

                  <div className="contact-card px-8 py-4 border-1 border-brand-light rounded-3xl bg-brand-light/10 hover:bg-brand-light/20 transition-all">
                    <p className="heading-26 text-brand text-brand-dark mb-3 font-bold">Phone</p>
                    <a href="tel:+917904645033" className="body-20 text-brand0dark hover:text-brand-accent transition-colors">
                      +91 7904645033
                    </a>
                  </div>

                  <div className="contact-card px-8 py-4 border-1 border-brand-light rounded-3xl bg-brand-light/10 hover:bg-brand-light/20 transition-all">
                    <p className="heading-26 text-brand text-brand0dark mb-3 font-bold">Location</p>
                    <p className="body-20 text-brand-dark">Salem, Tamil Nadu, India</p>
                  </div>
                </div>

                <div className="pt-8">
                  <h4 className="heading-26 text-brand0dark mb-6 font-bold">Why Choose Me?</h4>
                  <ul className="space-y-4 ">
                    <li className="why-item flex items-start gap-4">
                      <span className="w-2 h-2 rounded-full bg-brand-light mt-2 flex-shrink-0" />
                      <p className="body-18 text-brand0dark leading-relaxed">Skilled Full Stack Developer in Next.js, MERN, and AI/ML.</p>
                    </li>
                    <li className="why-item flex items-start gap-4">
                      <span className="w-2 h-2 rounded-full bg-brand-light mt-2 flex-shrink-0" />
                      <p className="body-18 text-brand0dark leading-relaxed">Crafts responsive, user-focused web applications with performance optimization.</p>
                    </li>
                    <li className="why-item flex items-start gap-4">
                      <span className="w-2 h-2 rounded-full bg-brand-light mt-2 flex-shrink-0" />
                      <p className="body-18 text-brand0dark leading-relaxed">Creative thinker driving dynamic, efficient solutions for real-world challenges.</p>
                    </li>
                    <li className="why-item flex items-start gap-4">
                      <span className="w-2 h-2 rounded-full bg-brand-light mt-2 flex-shrink-0" />
                      <p className="body-18 text-brand0dark leading-relaxed">Collaborative approach with clear communication</p>
                    </li>
                    <li className="why-item flex items-start gap-4">
                      <span className="w-2 h-2 rounded-full bg-brand-light mt-2 flex-shrink-0" />
                      <p className="body-18 text-brand0dark leading-relaxed">Commitment to quality and timely delivery</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Form - Make equal height with flex */}
            <div className="flex flex-col">
              <form onSubmit={handleSubmit} className="flex-grow flex flex-col space-y-8 p-10 border-1 border-brand-light rounded-3xl bg-[#201d1d]">
                <div className="form-element">
                  <label htmlFor="name" className="block body-18 text-brand-light mb-3 font-bold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-brand-dark border-2 border-brand-light rounded-2xl text-brand-light body-18 focus:outline-none focus:border-brand-accent transition-colors placeholder:text-brand-light/50"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-element">
                  <label htmlFor="email" className="block body-18 text-brand-light mb-3 font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-brand-dark border-2 border-brand-light rounded-2xl text-brand-light body-18 focus:outline-none focus:border-brand-accent transition-colors placeholder:text-brand-light/50"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-element flex-grow">
                  <label htmlFor="message" className="block body-18 text-brand-light mb-3 font-bold">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full h-[80%] px-6 py-4 bg-brand-dark border-2 border-brand-light rounded-2xl text-brand-light body-18 focus:outline-none focus:border-brand-accent transition-colors resize-none placeholder:text-brand-light/50"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {submitStatus && (
                  <div className={`p-4 rounded-2xl ${submitStatus.success ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
                    {submitStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-button w-full px-8 py-5 border border-brand-light bg-brand-light text-brand-light body-20 font-bold rounded-2xl hover:bg-brand-accent hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message →'
                  )}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}