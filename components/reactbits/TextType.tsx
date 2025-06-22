'use client';

import React from 'react';
import Typewriter from 'typewriter-effect';

interface TextTypeProps {
  strings: string[];
  wrapperClassName?: string;
  cursorClassName?: string;
  loop?: boolean;
  autoStart?: boolean;
}

const TextType: React.FC<TextTypeProps> = ({ 
  strings, 
  wrapperClassName, 
  cursorClassName,
  loop = true,
  autoStart = true
}) => {
  return (
    <div className={wrapperClassName}>
      <Typewriter
        options={{
          strings: strings,
          autoStart: autoStart,
          loop: loop,
          delay: 75,
          deleteSpeed: 50,
          wrapperClassName,
          cursorClassName,
        }}
      />
    </div>
  );
};

export default TextType; 