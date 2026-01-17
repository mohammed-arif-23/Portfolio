import { gsap } from 'gsap';


export const animationPresets = {
  // Clip-path reveal from top
  clipRevealTop: {
    from: { 
      opacity: 0, 
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' 
    },
    to: { 
      opacity: 1, 
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration: 0.8,
      ease: 'power2.out'
    }
  },

  // Clip-path reveal from left
  clipRevealLeft: {
    from: { 
      opacity: 0, 
      clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' 
    },
    to: { 
      opacity: 1, 
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration: 0.7,
      ease: 'power2.out'
    }
  },

  // 3D rotation reveal
  rotate3D: {
    from: { 
      opacity: 0, 
      rotateY: -90, 
      transformOrigin: 'center center' 
    },
    to: { 
      opacity: 1, 
      rotateY: 0,
      duration: 0.8,
      ease: 'back.out(1.5)'
    }
  },

  // Scale and fade with bounce
  scaleBounce: {
    from: { 
      opacity: 0, 
      scale: 0,
      rotation: -180
    },
    to: { 
      opacity: 1, 
      scale: 1,
      rotation: 0,
      duration: 0.7,
      ease: 'back.out(2)'
    }
  },

  // Slide up with scale
  slideUp: {
    from: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9 
    },
    to: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      duration: 0.7,
      ease: 'power3.out'
    }
  },

  // Slide from left
  slideLeft: {
    from: { 
      opacity: 0, 
      x: -50, 
      scale: 0.95 
    },
    to: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      duration: 0.7,
      ease: 'power3.out'
    }
  },

  // Elastic bounce
  elasticBounce: {
    from: { 
      opacity: 0, 
      scale: 0.5, 
      y: 30 
    },
    to: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      duration: 0.9,
      ease: 'elastic.out(1, 0.6)'
    }
  },

  // Spiral reveal
  spiralReveal: (index: number, total: number) => {
    const angle = (index * 360) / total;
    const distance = 80;
    const startX = Math.cos(angle * Math.PI / 180) * distance;
    const startY = Math.sin(angle * Math.PI / 180) * distance;
    
    return {
      from: {
        opacity: 0,
        scale: 0,
        rotation: -360,
        x: startX,
        y: startY
      },
      to: {
        opacity: 1,
        scale: 1,
        rotation: 0,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }
    };
  },

  // Liquid morph entrance
  liquidMorph: {
    from: {
      opacity: 0,
      scale: 0.5,
      borderRadius: '50%',
      rotation: 180
    },
    to: {
      opacity: 1,
      scale: 1,
      borderRadius: '0%',
      rotation: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)'
    }
  },

  // Glitch effect
  glitchReveal: {
    from: {
      opacity: 0,
      x: -20,
      skewX: 20
    },
    to: {
      opacity: 1,
      x: 0,
      skewX: 0,
      duration: 0.6,
      ease: 'power4.out'
    }
  },

  // Magnetic pull
  magneticPull: {
    from: {
      opacity: 0,
      scale: 1.5,
      filter: 'blur(20px)'
    },
    to: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      ease: 'expo.out'
    }
  }
};

/**
 * Apply stagger animation to multiple elements
 */
export function staggerAnimation(
  elements: Element[] | NodeListOf<Element>,
  preset: Exclude<keyof typeof animationPresets, 'spiralReveal'>,
  staggerDelay: number = 0.1,
  startDelay: number = 0
) {
  const animation = animationPresets[preset];
  
  if (typeof animation === 'function') return;
  
  gsap.fromTo(
    elements,
    animation.from,
    {
      ...animation.to,
      stagger: staggerDelay,
      delay: startDelay
    }
  );
}

/**
 * Create scroll-triggered animation
 */
export function scrollAnimation(
  trigger: Element,
  elements: Element[] | NodeListOf<Element>,
  preset: Exclude<keyof typeof animationPresets, 'spiralReveal'>,
  options?: {
    start?: string;
    end?: string;
    stagger?: number;
  }
) {
  const animation = animationPresets[preset];
  
  if (typeof animation === 'function') return;
  
  gsap.fromTo(
    elements,
    animation.from,
    {
      ...animation.to,
      stagger: options?.stagger || 0,
      scrollTrigger: {
        trigger,
        start: options?.start || 'top 80%',
        end: options?.end || 'bottom 20%',
        toggleActions: 'play none none none',
      }
    }
  );
}
