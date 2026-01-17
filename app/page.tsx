'use client';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Technologies from '@/components/Technologies';
import Projects from '@/components/Projects';
import Awards from '@/components/Awards';


export default function Home() {
  return (
    <>
      <main className="relative">
        <Hero />
        <About />
        <Technologies />
        <Experience />
        <Projects />
        <Awards />
        <Contact />
      </main>
    </>
  );
}