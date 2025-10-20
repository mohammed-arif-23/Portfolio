'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function MagneticButton({ 
  children, 
  href, 
  onClick,
  variant = 'primary' 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    if (!button) return;

    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const baseClasses = `
    relative inline-flex items-center gap-3 px-8 py-4 rounded-full
    border-2 transition-all duration-300 overflow-hidden group
    magnetic-btn
  `;

  const variantClasses = variant === 'primary'
    ? 'bg-brand-dark text-brand-light border-brand-dark hover:bg-transparent hover:text-brand-dark'
    : 'bg-transparent text-brand-dark border-brand-dark hover:bg-brand-dark hover:text-brand-light';

  const ArrowIcon = () => (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M8.53023 15.6725L7.46957 14.6118L13.2604 8.821H0.928836V7.32116H13.2604L7.46957 1.53035L8.53023 0.469686L16.1316 8.07108L8.53023 15.6725Z" 
        fill="currentColor"
      />
    </svg>
  );

  const content = (
    <>
      <span className="relative z-10 body-20 font-semibold">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        <ArrowIcon />
      </span>
      <span className="absolute inset-0 bg-brand-accent scale-0 group-hover:scale-100 transition-transform duration-500 ease-out rounded-full" />
    </>
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`${baseClasses} ${variantClasses}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        data-cursor-text="View"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {content}
    </button>
  );
}
