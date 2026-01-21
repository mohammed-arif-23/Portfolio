'use client';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Technologies from '@/components/Technologies';
import Projects from '@/components/Projects';
import Awards from '@/components/Awards';
import Contact from '@/components/Contact';

export default function Home() {
    return (
        <main className="relative bg-black w-full min-h-screen overflow-hidden text-white">
            <Hero />
            <About />
            <Technologies />
            <Experience />
            <Projects />
            <Awards />
            <Contact />
        </main>
    );
}
