'use client';

import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }: { children: any }) {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
