'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SprayWriteProps {
  text: string;
  className?: string;
  onComplete?: () => void;
}

interface StrokePoint {
  x: number;
  y: number;
  pressure: number;
  time: number;
}

interface LetterStroke {
  letter: string;
  points: StrokePoint[];
  bounds: { minX: number; maxX: number; minY: number; maxY: number; width: number; height: number };
  startTime: number;
  endTime: number;
}

const SPRAY_COLORS = ['#ff6b00', '#ff8533', '#ffaa00', '#ffd700', '#fff5e6'];

function createEmptyStroke(letter: string, fontSize: number): LetterStroke {
  const ctx = document.createElement('canvas').getContext('2d')!;
  ctx.font = `900 ${fontSize}px "Archivo Black VF", sans-serif`;
  const metrics = ctx.measureText(letter);
  const width = metrics.width + fontSize;
  const height = fontSize + fontSize;
  
  return {
    letter,
    points: [],
    bounds: {
      minX: -width / 2,
      maxX: width / 2,
      minY: -height / 2,
      maxY: height / 2,
      width,
      height,
    },
    startTime: 0,
    endTime: 800,
  };
}

function generateLetterPath(letter: string, fontSize: number): LetterStroke {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const padding = fontSize * 0.5;
  
  ctx.font = `900 ${fontSize}px "Archivo Black VF", sans-serif`;
  const metrics = ctx.measureText(letter);
  const width = metrics.width + padding * 2;
  const height = fontSize + padding * 2;
  
  canvas.width = width;
  canvas.height = height;
  
  ctx.font = `900 ${fontSize}px "Archivo Black VF", sans-serif`;
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'white';
  ctx.fillText(letter, padding, padding);
  
const imageData = ctx.getImageData(0, 0, width, height);
  if (!imageData) return createEmptyStroke(letter, fontSize);
  
  const data: Uint8ClampedArray = imageData.data;
  const pixels: StrokePoint[] = [];
  
  const step = Math.max(1, Math.floor(fontSize / 20));
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const idx = (y * width + x) * 4;
      const alpha = data[idx + 3] as number;
      if (alpha > 128) {
        pixels.push({
          x: x - width / 2,
          y: y - height / 2,
          pressure: 0.5 + Math.random() * 0.5,
          time: 0,
        });
      }
    }
  }
  
  pixels.sort((a, b) => {
    const angleA = Math.atan2(a.y, a.x);
    const angleB = Math.atan2(b.y, b.x);
    return angleA - angleB;
  });
  
  const totalTime = 800 + pixels.length * 2;
  pixels.forEach((p, i) => {
    p.time = (i / pixels.length) * totalTime;
  });
  
  return {
    letter,
    points: pixels,
    bounds: {
      minX: -width / 2,
      maxX: width / 2,
      minY: -height / 2,
      maxY: height / 2,
      width,
      height,
    },
    startTime: 0,
    endTime: totalTime,
  };
}

export function SprayWriteSignature({
  text = 'RUAN TRAPP',
  className,
  onComplete,
}: SprayWriteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokes, setStrokes] = useState<LetterStroke[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mediaQuery.matches;
    const handler = (e: MediaQueryListEvent) => { reducedMotionRef.current = e.matches; };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const fontSize = Math.min(window.innerWidth * 0.08, 120);
    const letters = text.split(' ').flatMap(word => word.split(''));
    
    let currentTime = 0;
    const letterStrokes = letters.map((letter, i) => {
      const stroke = generateLetterPath(letter, fontSize);
      stroke.startTime = currentTime;
      stroke.endTime = currentTime + stroke.points.length * 2 + 800;
      currentTime = stroke.endTime + 150;
      return stroke;
    });

    setStrokes(letterStrokes);
    setIsReady(true);
    startTimeRef.current = performance.now();
  }, [text]);

  useEffect(() => {
    if (!isReady || reducedMotionRef.current) {
      setProgress(1);
      onComplete?.();
      return;
    }

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;
      const totalDuration = strokes[strokes.length - 1]?.endTime || 5000;
      const p = Math.min(elapsed / totalDuration, 1);
      setProgress(p);
      
      if (p >= 1) {
        onComplete?.();
        return;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isReady, strokes, onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isReady) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let lastTime = 0;
    let animationId = 0;

    const draw = (currentTime: number) => {
      const deltaTime = Math.min(currentTime - lastTime, 100);
      lastTime = currentTime;

      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.fillStyle = 'rgba(3, 3, 3, 0.1)';
      ctx.fillRect(0, 0, width, height);

      const elapsed = currentTime - startTimeRef.current;

      strokes.forEach(stroke => {
        const strokeElapsed = elapsed - stroke.startTime;
        if (strokeElapsed <= 0) return;

        const visiblePoints = stroke.points.filter(p => p.time <= strokeElapsed);
        if (visiblePoints.length === 0) return;

        const letterCenterX = centerX + (stroke.bounds.width * (strokes.indexOf(stroke) - (strokes.length - 1) / 2) * 1.1);
        
        ctx.save();
        ctx.translate(letterCenterX, centerY);
        
        visiblePoints.forEach((p, i) => {
          const lifeRatio = i / visiblePoints.length;
          const alpha = Math.min(1, (strokeElapsed - p.time) / 200) * (0.6 + p.pressure * 0.4);
          const size = Math.max(0.5, p.pressure * (2 + Math.sin(currentTime * 0.005 + i) * 0.5));
          
          ctx.globalAlpha = Math.min(alpha, 1);
          ctx.fillStyle = SPRAY_COLORS[Math.floor(Math.random() * SPRAY_COLORS.length)] as string;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
        });
        
        ctx.restore();
      });

      animationId = requestAnimationFrame(draw);
    };

    startTimeRef.current = performance.now();
    animationId = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [strokes, isReady]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'absolute inset-0 w-full h-full pointer-events-none',
        className
      )}
      aria-hidden="true"
      style={{ display: isReady ? 'block' : 'none' }}
    />
  );
}