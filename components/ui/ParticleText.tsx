'use client';

import { CSSProperties, useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  phase: number;
  tone: number;
};

export interface ParticleTextProps {
  text: string;
  color?: string;
  highlightColor?: string;
  density?: number;
  particleSize?: number;
  scatter?: number;
  pointerRepel?: number;
  repelRadius?: number;
  fontSize?: number | string;
  fontWeight?: number;
  className?: string;
  style?: CSSProperties;
}

export default function ParticleText({
  text,
  color = '#f3f1e8',
  highlightColor = '#c8ff5e',
  density = 5,
  particleSize = 1.5,
  scatter = 160,
  pointerRepel = 52,
  repelRadius = 110,
  fontSize = 'clamp(6rem, 21vw, 19rem)',
  fontWeight = 900,
  className = '',
  style,
}: ParticleTextProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const pointer = { x: -9999, y: -9999, active: false };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let resizeFrame = 0;
    let disposed = false;

    const resolveFontSize = () => {
      if (typeof fontSize === 'number') return fontSize;
      const probe = document.createElement('span');
      probe.style.cssText = `position:absolute;visibility:hidden;font-size:${fontSize};font-family:inherit;font-weight:${fontWeight}`;
      probe.textContent = text;
      host.appendChild(probe);
      const size = Number.parseFloat(getComputedStyle(probe).fontSize) || 180;
      probe.remove();
      return size;
    };

    const build = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const sample = document.createElement('canvas');
      sample.width = width;
      sample.height = height;
      const sampleCtx = sample.getContext('2d', { willReadFrequently: true });
      if (!sampleCtx) return;

      const px = resolveFontSize();
      const family = getComputedStyle(host).fontFamily || 'sans-serif';
      sampleCtx.clearRect(0, 0, width, height);
      sampleCtx.fillStyle = '#fff';
      sampleCtx.font = `${fontWeight} ${px}px ${family}`;
      sampleCtx.textAlign = 'center';
      sampleCtx.textBaseline = 'middle';
      sampleCtx.fillText(text, width / 2, height / 2 + px * 0.035);

      const pixels = sampleCtx.getImageData(0, 0, width, height).data;
      const next: Particle[] = [];
      const step = Math.max(3, density);
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          if (pixels[(y * width + x) * 4 + 3] > 120) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * scatter + 24;
            next.push({
              x: reduced ? x : x + Math.cos(angle) * distance,
              y: reduced ? y : y + Math.sin(angle) * distance,
              tx: x,
              ty: y,
              vx: 0,
              vy: 0,
              phase: Math.random() * Math.PI * 2,
              tone: Math.random(),
            });
          }
        }
      }
      particles = next;
    };

    const render = (time = 0) => {
      if (disposed) return;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!reduced) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (pointer.active && distance < repelRadius && distance > 0.1) {
            const force = (1 - distance / repelRadius) * pointerRepel;
            p.vx += (dx / distance) * force * 0.12;
            p.vy += (dy / distance) * force * 0.12;
          }

          p.vx += (p.tx - p.x) * 0.045;
          p.vy += (p.ty - p.y) * 0.045;
          p.vx *= 0.86;
          p.vy *= 0.86;
          p.x += p.vx;
          p.y += p.vy;
        }

        const drift = reduced ? 0 : Math.sin(time * 0.0012 + p.phase) * 0.45;
        ctx.globalAlpha = 0.62 + p.tone * 0.38;
        ctx.fillStyle = p.tone > 0.82 ? highlightColor : color;
        ctx.beginPath();
        ctx.arc(p.x + drift, p.y + drift, particleSize * (0.72 + p.tone * 0.55), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(build);
    };

    const observer = new ResizeObserver(onResize);
    observer.observe(host);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);

    document.fonts?.ready.then(() => {
      if (!disposed) build();
    });
    build();
    frame = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(resizeFrame);
      observer.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [color, density, fontSize, fontWeight, highlightColor, particleSize, pointerRepel, repelRadius, scatter, text]);

  return (
    <div
      ref={hostRef}
      className={`particle-text ${className}`}
      style={style}
      role="img"
      aria-label={text}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="sr-only">{text}</span>
    </div>
  );
}
