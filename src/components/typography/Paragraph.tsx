
import React from 'react';
import { cn } from '@/lib/utils';

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  weight?: 'light' | 'normal' | 'medium' | 'semibold';
}

export function Paragraph({
  children,
  className,
  size = 'medium',
  weight = 'normal',
  ...props
}: ParagraphProps & React.HTMLAttributes<HTMLParagraphElement>) {
  
  const fontSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  const fontWeights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
  };

  return (
    <p
      className={cn(
        fontSizes[size],
        fontWeights[weight],
        'leading-normal mb-4',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
