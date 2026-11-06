'use client';

import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  type: 'spray' | 'ember' | 'dust' | 'paint';
  rotation: number;
  rotationSpeed: number;
}

interface SprayParticleSystemProps {
  particleCount?: number;
  accentColor?: string;
  density?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  colorScheme?: 'fire' | 'neon' | 'monochrome' | 'full';
  className?: string;
}

const COLOR_SCHEMES = {
  fire: [
    '#ffffff',
    '#fff5e6',
    '#ffd700',
    '#ffaa00',
    '#ff6b00',
    '#ff4500',
    '#ff0000',
  ],
  neon: [
    '#ffffff',
    '#00d4ff',
    '#00b8e6',
    '#0099cc',
    '#ff0066',
    '#ff00aa',
    '#cc00ff',
  ],
  monochrome: [
    '#ffffff',
    '#e5e5e5',
    '#cccccc',
    '#999999',
    '#666666',
    '#333333',
    '#111111',
  ],
  full: [
    '#ffffff',
    '#fff5e6',
    '#ffd700',
    '#ffaa00',
    '#ff6b00',
    '#ff0066',
    '#ff00aa',
    '#cc00ff',
    '#00d4ff',
    '#00b8e6',
  ],
};

const PAINT_COLORS = ['#ff6b00', '#ff0066', '#00d4ff', '#ffd700', '#ff00aa'];

function createParticle(
  width: number,
  height: number,
  colors: readonly string[],
  accentColor: string
): Particle {
  const typeRoll = Math.random();
  let type: Particle['type'] = 'spray';
  let size: number;
  let color: string;
  let alpha: number;
  let maxLife: number;
  let vx: number;
  let vy: number;

  if (typeRoll < 0.5) {
    type = 'spray';
    size = Math.random() * 3 + 1;
    const colorIndex = Math.floor(Math.random() * colors.length);
    color = colors[colorIndex] ?? '#ffffff';
    alpha = Math.random() * 0.7 + 0.3;
    maxLife = Math.random() * 200 + 150;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 1.5 + 0.5;
    vx = Math.cos(angle) * speed;
    vy = Math.sin(angle) * speed;
  } else if (typeRoll < 0.75) {
    type = 'ember';
    size = Math.random() * 6 + 4;
    color = accentColor;
    alpha = Math.random() * 0.5 + 0.3;
    maxLife = Math.random() * 300 + 200;
    vx = (Math.random() - 0.5) * 0.3;
    vy = -Math.random() * 0.5 - 0.1;
  } else if (typeRoll < 0.9) {
    type = 'dust';
    size = Math.random() * 1.5 + 0.5;
    color = '#ffffff';
    alpha = Math.random() * 0.4 + 0.1;
    maxLife = Math.random() * 400 + 300;
    vx = (Math.random() - 0.5) * 0.2;
    vy = (Math.random() - 0.5) * 0.2;
  } else {
    type = 'paint';
    size = Math.random() * 8 + 4;
    const paintIndex = Math.floor(Math.random() * PAINT_COLORS.length);
    color = PAINT_COLORS[paintIndex] ?? '#ff6b00';
    alpha = Math.random() * 0.6 + 0.4;
    maxLife = Math.random() * 150 + 100;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 1;
    vx = Math.cos(angle) * speed;
    vy = Math.sin(angle) * speed;
  }

  const spreadX = width * 0.8;
  const spreadY = height * 0.8;

  return {
    x: width / 2 + (Math.random() - 0.5) * spreadX,
    y: height / 2 + (Math.random() - 0.5) * spreadY,
    vx,
    vy,
    size,
    color,
    alpha,
    life: 0,
    maxLife,
    type,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.02,
  };
}

function respawnParticle(p: Particle, width: number, height: number, colors: readonly string[]): void {
  const side = Math.floor(Math.random() * 4);

  switch (side) {
    case 0:
      p.x = Math.random() * width;
      p.y = -50;
      break;
    case 1:
      p.x = width + 50;
      p.y = Math.random() * height;
      break;
    case 2:
      p.x = Math.random() * width;
      p.y = height + 50;
      break;
    default:
      p.x = -50;
      p.y = Math.random() * height;
  }

  p.life = 0;
  p.maxLife = Math.random() * 200 + 150;
  const colorIndex = Math.floor(Math.random() * colors.length);
  p.color = colors[colorIndex] ?? '#ffffff';
  p.vx = (Math.random() - 0.5) * 2;
  p.vy = (Math.random() - 0.5) * 2;
  p.rotation = Math.random() * Math.PI * 2;
  p.rotationSpeed = (Math.random() - 0.5) * 0.02;
}

export function SprayParticleSystem({
  particleCount = 180,
  accentColor = '#ff6b00',
  density = 'medium',
  interactive = true,
  colorScheme = 'fire',
  className,
}: SprayParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef(true);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const timeRef = useRef(0);

  const colors = COLOR_SCHEMES[colorScheme];
  const count = Math.floor(
    particleCount * (density === 'low' ? 0.5 : density === 'high' ? 1.5 : 1)
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = Array.from({ length: count }, () =>
        createParticle(width, height, colors, accentColor)
      );
    };
    resize();

    let animationId = 0;
    let lastTime = 0;

    const handleMouseMove = (event: MouseEvent) => {
      if (interactive) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.targetX = event.clientX - rect.left;
        mouseRef.current.targetY = event.clientY - rect.top;
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (interactive && event.touches[0]) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.targetX = event.touches[0].clientX - rect.left;
        mouseRef.current.targetY = event.touches[0].clientY - rect.top;
      }
    };

    const animate = (currentTime: number) => {
      if (isVisibleRef.current && !reducedMotion) {
        const deltaTime = Math.min(currentTime - lastTime, 100);
        lastTime = currentTime;
        timeRef.current += deltaTime;

        const localCtx = ctx;
        const particles = particlesRef.current;
        if (localCtx && particles) {
          const width = canvas.width / dpr;
          const height = canvas.height / dpr;

          localCtx.fillStyle = 'rgba(3, 3, 3, 0.15)';
          localCtx.fillRect(0, 0, width, height);

          mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
          mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

          const mouseX = mouseRef.current.x;
          const mouseY = mouseRef.current.y;
          const time = timeRef.current;

          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            if (!p) continue;

            p.x += p.vx;
            p.y += p.vy;

            const organic = Math.sin(time * 0.001 + p.life * 0.01) * 0.5;
            p.x += organic;
            p.y += Math.cos(time * 0.001 + p.life * 0.01) * 0.5;

            if (interactive) {
              const dx = mouseX - p.x;
              const dy = mouseY - p.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 250 && dist > 1) {
                const force = Math.min((250 - dist) / 250, 1) * 0.15;
                p.vx += (dx / dist) * force;
                p.vy += (dy / dist) * force;
              }
            }

            if (p.type === 'ember') {
              p.vy += 0.005;
            }

            p.vx += Math.sin(time * 0.0005 + p.life * 0.01) * 0.02;
            p.vy += Math.cos(time * 0.0005 + p.life * 0.01) * 0.01;

            p.vx *= 0.995;
            p.vy *= 0.995;

            p.rotation += p.rotationSpeed;

            p.life++;
            const lifeRatio = p.life / p.maxLife;
            p.alpha = Math.max(0, (1 - lifeRatio * 0.8) * (0.8 + Math.sin(time * 0.005 + p.life) * 0.2));

            const margin = 100;
            if (
              p.life > p.maxLife ||
              p.x < -margin ||
              p.x > width + margin ||
              p.y < -margin ||
              p.y > height + margin
            ) {
              respawnParticle(p, width, height, colors);
            }

            localCtx.save();
            localCtx.translate(p.x, p.y);
            localCtx.rotate(p.rotation);
            localCtx.globalAlpha = Math.min(p.alpha, 1);

            if (p.type === 'ember') {
              const gradient = localCtx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
              gradient.addColorStop(0, p.color);
              gradient.addColorStop(0.5, p.color);
              gradient.addColorStop(1, 'transparent');
              localCtx.fillStyle = gradient;
              localCtx.beginPath();
              localCtx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
              localCtx.fill();
            } else if (p.type === 'dust') {
              localCtx.fillStyle = p.color;
              localCtx.globalAlpha = p.alpha * 0.5;
              localCtx.beginPath();
              localCtx.arc(0, 0, p.size, 0, Math.PI * 2);
              localCtx.fill();
            } else if (p.type === 'paint') {
              localCtx.fillStyle = p.color;
              localCtx.globalAlpha = p.alpha;
              localCtx.beginPath();
              const points = 5 + (p.life % 4);
              for (let j = 0; j < points; j++) {
                const splatterAngle = (j / points) * Math.PI * 2;
                const radius = p.size * (0.7 + ((p.life * (j + 1)) % 7) / 10);
                const sx = Math.cos(splatterAngle) * radius;
                const sy = Math.sin(splatterAngle) * radius;
                if (j === 0) localCtx.moveTo(sx, sy);
                else localCtx.lineTo(sx, sy);
              }
              localCtx.closePath();
              localCtx.fill();
            } else {
              localCtx.fillStyle = p.color;
              localCtx.beginPath();
              localCtx.arc(0, 0, p.size, 0, Math.PI * 2);
              localCtx.fill();
            }

            localCtx.restore();
          }
        }
      } else {
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05, rootMargin: '100px' }
    );
    observer.observe(canvas);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', resize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [accentColor, density, interactive, colorScheme, count, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}