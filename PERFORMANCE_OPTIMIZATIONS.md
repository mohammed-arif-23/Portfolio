# Performance Optimizations Checklist

## 🚀 High Priority
- [ ] **Image Optimization**: Ensure all images use `next/image` with proper `sizes` and `priority` attributes.
- [ ] **Font Optimization**: Verify `next/font` usage for Google Fonts (Figtree) to prevent layout shift.
- [ ] **Bundle Analysis**: Run `@next/bundle-analyzer` to identify large dependencies.
- [ ] **Three.js Optimization**: 
    - [ ] Dispose geometries and materials when unmounting.
    - [ ] Use `draco` compression for models.
    - [ ] Limit pixel ratio on high-DPI screens (`Math.min(window.devicePixelRatio, 2)`).

## ⚡ Rendering & Interaction
- [ ] **Lazy Loading**: Use `next/dynamic` for heavy components below the fold (e.g., `FluidProjects`, `Experience`).
- [ ] **Scroll Performance**: Optimize `Lenis` configuration for mobile devices.
- [ ] **Animation Performance**: Ensure GSAP animations use `will-change` sparingly and clean up ScrollTriggers.

## 🛠️ Code Quality
- [ ] **Tree Shaking**: Verify imports from large libraries like `lucide-react` and `gsap` are tree-shakeable.
- [ ] **Memoization**: Use `useMemo` and `useCallback` for expensive calculations in 3D scenes.
