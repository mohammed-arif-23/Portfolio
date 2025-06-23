'use client';

import { useEffect, useState } from 'react';
import { TextSplit } from '@/components/reactbits';

const MESSAGES = [
  'Hello!',
  'Hola!',
  'Bonjour',
  'Ciao',
  'Willkommen',
  'नमस्ते', // Hindi
  'こんにちは', // Japanese
  '你好', // Chinese
  'مرحبا', // Arabic
  'Привет', // Russian
  '안녕하세요', // Korean
  'Olá', // Portuguese
  'Hej', // Swedish/Danish
  'سلام', // Persian/Azeri
  'Γειά σου', // Greek
  'Selam', // Turkish
  'Halo', // Indonesian
  'สวัสดี', // Thai
  'שָׁלוֹם', // Hebrew
  'Aloha', // Hawaiian
  'Sveiki', // Latvian
  'Cześć', // Polish
  'Dzień dobry', // Polish (formal)
  'Hallo', // Dutch
  'Tere', // Estonian
  'Merhaba', // Turkish (alt)
  'Szia', // Hungarian
  'Kamusta', // Filipino
  'Xin chào', // Vietnamese
  'Sawubona', // Zulu
  'Habari', // Swahili
];

export default function Welcome() {
  const [index, setIndex] = useState(0);
  const [trigger, setTrigger] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const entrance = setTimeout(() => {
      setTrigger(true);
      setShow(true);
    }, 100);
    return () => clearTimeout(entrance);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false); 
      setTimeout(() => {
        setTrigger(false);
        setIndex((prev) => (prev + 1) % MESSAGES.length);
        setTimeout(() => {
          setTrigger(true);
          setShow(true); // fade/blur in
        }, 50); // let TextSplit remount
      }, 350); 
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