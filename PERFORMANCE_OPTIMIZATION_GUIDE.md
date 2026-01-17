# Performance Optimization Guide

## 1. Image Optimization
Next.js automatically optimizes images, but proper usage is key.
- **Sizes Prop**: Always define the `sizes` prop for responsive images to serve the correct size.
- **Priority**: Add `priority` to images above the fold (e.g., Hero section images) to improve LCP (Largest Contentful Paint).
- **Formats**: Ensure `next.config.ts` allows modern formats like AVIF (enabled by default in Next.js 15).

## 2. Three.js & Canvas Optimization
3D elements can be heavy.
- **Damping**: Use `drei`'s `PerformanceMonitor` to lower quality on low-end devices.
- **Pixel Ratio**: Cap the pixel ratio to 2 to save battery and GPU on mobile.
  ```tsx
  <Canvas dpr={[1, 2]}> ... </Canvas>
  ```
- **Draco Compression**: Compress GLTF models using gltf-pipeline and load them with `useGLTF`.

## 3. Lazy Loading Components
Split code chunks to speed up initial load.
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false // If not needed for SEO
});
```

## 4. Animation Optimization (GSAP)
- **Context Cleanup**: Always use `gsap.context()` in `useLayoutEffect` to clean up animations on unmount.
- **Will-Change**: Use `will-change: transform` in CSS for elements that animate, but remove it after animation to save memory.
- **ScrollTrigger**: Kill ScrollTrigger instances when components unmount.

## 5. Bundle Analysis
Install `@next/bundle-analyzer` to visualize bundle size.
```bash
npm install @next/bundle-analyzer
```
Configure in `next.config.ts` to run analysis when `ANALYZE=true`.
