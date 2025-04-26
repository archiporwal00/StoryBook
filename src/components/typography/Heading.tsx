
import React from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
}

export function Heading({
  as = 'h2',
  children,
  className,
  weight = 'bold',
  ...props
}: HeadingProps & React.HTMLAttributes<HTMLHeadingElement>) {
  const Component = as;
  
  const fontSizes = {
    h1: 'text-4xl md:text-5xl',
    h2: 'text-3xl md:text-4xl',
    h3: 'text-2xl md:text-3xl',
    h4: 'text-xl md:text-2xl',
    h5: 'text-lg md:text-xl',
    h6: 'text-base md:text-lg',
  };

  const fontWeights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <Component
      className={cn(
        fontSizes[as],
        fontWeights[weight],
        'leading-tight tracking-tight mb-2',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
