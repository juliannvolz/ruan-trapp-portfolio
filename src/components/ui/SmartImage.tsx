'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SmartImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  className?: string;
  blurhash?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  onLoad?: () => void;
  unoptimized?: boolean;
}

export function SmartImage({
  src,
  alt,
  width,
  height,
  priority = false,
  fill = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  className,
  blurhash,
  quality = 85,
  placeholder = 'blur',
  loading = 'lazy',
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad,
  unoptimized = false,
}: SmartImageProps) {
  const isExternal = src.startsWith('http') || src.startsWith('//');
  
  // Only use blur placeholder if blurhash is provided
  const effectivePlaceholder = blurhash ? placeholder : 'empty';
  const effectiveBlurDataURL = blurhash || undefined;

  const imageProps = {
    src: isExternal ? src : src,
    alt,
    width,
    height,
    priority,
    fill,
    sizes: fill ? sizes : undefined,
    quality,
    placeholder: effectivePlaceholder,
    blurDataURL: effectiveBlurDataURL,
    loading,
    unoptimized,
    style: {
      objectFit,
      objectPosition,
      width: fill ? '100%' : undefined,
      height: fill ? '100%' : undefined,
    },
    onLoad,
    className: cn(className),
  };

  if (isExternal) {
    // For external images, use regular img tag since next/image requires local images or configured domains
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        style={{
          objectFit,
          objectPosition,
          width: fill ? '100%' : width,
          height: fill ? '100%' : height,
        }}
        className={cn(className)}
        onLoad={onLoad}
      />
    );
  }

  return <Image {...imageProps} />;
}

interface ResponsiveImageProps extends Omit<SmartImageProps, 'src' | 'sizes'> {
  src: string;
  widths?: number[];
  sizes?: string;
}

export function ResponsiveImage({
  src,
  alt,
  widths = [640, 750, 1080, 1200, 1920],
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  className,
  priority = false,
  ...props
}: ResponsiveImageProps) {
  const baseName = src.replace(/\.(webp|avif|jpg|jpeg|png)$/i, '');
  
  const srcSet = widths
    .map(w => `${baseName}-w${w}.webp ${w}w`)
    .join(', ');

  return (
    <SmartImage
      src={`${baseName}.webp`}
      alt={alt}
      className={className}
      priority={priority}
      {...props}
    />
  );
}