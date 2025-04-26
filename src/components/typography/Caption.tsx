
import React from 'react';
import { cn } from '@/lib/utils';

interface CaptionProps {
  children: React.ReactNode;
  className?: string;
  weight?: 'light' | 'normal' | 'medium';
}

export function Caption({
  children,
  className,
  weight = 'normal',
  ...props
}: CaptionProps & React.HTMLAttributes<HTMLParagraphElement>) {
  
  const fontWeights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
  };

  return (
    <p
      className={cn(
        'text-xs',
        fontWeights[weight],
        'leading-snug opacity-80',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
