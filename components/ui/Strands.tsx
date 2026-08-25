'use client';

import { CSSProperties, useEffect, useRef } from 'react';

export interface StrandsProps {
  colors?: string[];
  count?: number;
  speed?: number;
  amplitude?: number;
  glow?: number;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
}

const hexToRgb = (hex: string) => {
  const clean = hex.replace('#', '');
  const value = Number.parseInt(clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean, 16);
  return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`;
};

export default function Strands({
  colors = ['#c8ff5e', '#ff7a68', '#9c8cff'],
  count = 4,
  speed = 0.55,
  amplitude = 1,
  glow = 1,
  opacity = 0.7,
  className = '',
  style,
}: StrandsProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0, y: 0 };
    let width = 1;
    let height = 1;
    let dpr = 1;
    let raf = 0;
    let disposed = false;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawStrand = (index: number, time: number) => {
      const color = colors[index % colors.length];
      const rgb = hexToRgb(color);
      const phase = index * 1.37;
      const center = height * (0.22 + (index / Math.max(count - 1, 1)) * 0.56);
      const wave = height * 0.13 * amplitude;
      const pointerShift = pointer.y * (0.15 + index * 0.025);

      ctx.beginPath();
      for (let x = -20; x <= width + 20; x += 10) {
        const progress = x / width;
        const y =
          center +
          Math.sin(progress * Math.PI * 2.3 + time * speed + phase) * wave +
          Math.sin(progress * Math.PI * 5.1 - time * speed * 0.45 + phase) * wave * 0.24 +
          pointerShift * Math.sin(progress * Math.PI);
        if (x === -20) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineCap = 'round';
      ctx.lineWidth = 1.1 + index * 0.55;
      ctx.strokeStyle = `rgba(${rgb}, ${opacity})`;
      ctx.shadowBlur = 22 * glow;
      ctx.shadowColor = color;
      ctx.stroke();

      ctx.lineWidth = 10 + index * 5;
      ctx.strokeStyle = `rgba(${rgb}, ${opacity * 0.055})`;
      ctx.shadowBlur = 38 * glow;
      ctx.stroke();
    };

    const render = (ms = 0) => {
      if (disposed) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      const time = reduced ? 1.2 : ms * 0.00055;
      for (let i = 0; i < count; i += 1) drawStrand(i, time);
      ctx.globalCompositeOperation = 'source-over';
      if (!reduced) raf = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x += ((event.clientX - rect.left) / rect.width - 0.5 - pointer.x) * 0.08;
      pointer.y += ((event.clientY - rect.top) / rect.height - 0.5 - pointer.y) * 0.08;
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (reduced) render();
    });
    observer.observe(host);
    host.addEventListener('pointermove', onPointerMove);
    resize();
    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
    };
  }, [amplitude, colors, count, glow, opacity, speed]);

  return (
    <div ref={hostRef} className={`strands ${className}`} style={style} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
