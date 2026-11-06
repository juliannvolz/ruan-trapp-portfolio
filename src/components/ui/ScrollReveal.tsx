'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
  rotate?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  asChild?: boolean;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.7,
  y = 40,
  x = 0,
  scale = 1,
  opacity = 0,
  rotate = 0,
  once = true,
  amount = 0.15,
  className,
  asChild = false,
  style,
  ...props
}: ScrollRevealProps) {
  const initial = {
    opacity,
    y,
    x,
    scale,
    rotate,
  };

  const animate = {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotate: 0,
  };

  const transition = {
    duration,
    delay,
    ease: [0.23, 1, 0.32, 1] as const,
  };

  const viewport = {
    once,
    amount,
  };

  if (asChild && React.isValidElement(children)) {
    return (
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        viewport={viewport}
        style={style}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      viewport={viewport}
      style={style}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div';
}

export function TextReveal({
  children,
  delay = 0,
  duration = 0.7,
  stagger = 0.03,
  className,
  as: Component = 'p',
}: TextRevealProps) {
  const textContent = typeof children === 'string' ? children : String(children);
  const words = textContent.split(' ');

  return (
    <Component className={cn('inline-block', className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: '110%' }}
          animate={{ opacity: 1, y: '0%' }}
          transition={{ duration, delay: delay + i * stagger, ease: [0.23, 1, 0.32, 1] as const }}
          className="inline-block overflow-hidden"
        >
          {word}{i < words.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </Component>
  );
}

interface LetterRevealProps {
  children: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
}

export function LetterReveal({
  children,
  delay = 0,
  duration = 0.5,
  stagger = 0.02,
  className,
}: LetterRevealProps) {
  return (
    <span className={cn('inline-block overflow-hidden', className)}>
      {children.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: '0%' }}
          transition={{ duration, delay: delay + i * stagger, ease: [0.23, 1, 0.32, 1] as const }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}