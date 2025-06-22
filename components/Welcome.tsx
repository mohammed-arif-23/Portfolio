'use client';

import { useEffect, useState } from 'react';
import { TextSplit } from '@/components/reactbits';

const MESSAGES = [
  'Hello!',
  'Hola!',
  'Welcome',
  'Bonjour',
  'Ciao',
  'Willkommen',
  'नमस्ते',
  'こんにちは',
  '你好',
  '안녕하세요',
  'مرحبا',
  'Привет',
];

export default function Welcome() {
  const [index, setIndex] = useState(0);
  const [trigger, setTrigger] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Entrance animation for the first message
    const entrance = setTimeout(() => {
      setTrigger(true);
      setShow(true);
    }, 100);
    return () => clearTimeout(entrance);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false); // start fade/blur out
      setTimeout(() => {
        setTrigger(false);
        setIndex((prev) => (prev + 1) % MESSAGES.length);
        setTimeout(() => {
          setTrigger(true);
          setShow(true); // fade/blur in
        }, 50); // let TextSplit remount
      }, 350); // match CSS transition duration
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-[100dvh] w-[100dvw] flex items-center justify-center relative">
      <div className="text-center">
        <div
          className={`transition-all duration-300 ease-in-out ${show ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
        >
          <TextSplit
            className="text-6xl md:text-8xl font-bold text-white"
            animation="chars"
            stagger={0.05}
            duration={0.8}
            trigger={trigger}
          >
            {MESSAGES[index]}
          </TextSplit>
        </div>
      </div>
      <div className="absolute bottom-8 left-0 w-full flex justify-center">
        <span className="text-white/70 text-base md:text-lg animate-bounce-slow">Scroll and get to know about me</span>
      </div>
    </section>
  );
} 