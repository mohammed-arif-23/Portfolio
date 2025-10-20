'use client';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import { VelocityScroll } from '@/components/VelocityScroll';
import FluidProjects from '@/components/FluidProjects';
import Technologies from '@/components/Technologies';

export default function Home() {
  return (
    <>
      <main className="relative">
        <Hero />
        <About />
        <Technologies />
        <Experience />
        <VelocityScroll text="My Projects" default_velocity={5} className="text-4xl md:text-6xl font-bold text-brand-dark py-10" />
        <FluidProjects />
        <Contact />
      </main>
    </>
  );
}