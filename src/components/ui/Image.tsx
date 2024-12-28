import { ImgHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export default function Image({ className, alt, fallback, ...props }: ImageProps) {
  return (
    <img
      className={cn("max-w-full h-auto", className)}
      alt={alt}
      {...props}
    />
  );
}