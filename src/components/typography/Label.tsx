
import React from 'react';
import { cn } from '@/lib/utils';

interface LabelProps {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
  weight?: 'normal' | 'medium' | 'semibold';
  required?: boolean;
}

export function Label({
  children,
  className,
  htmlFor,
  weight = 'medium',
  required = false,
  ...props
}: LabelProps & Omit<React.HTMLAttributes<HTMLLabelElement>, 'htmlFor'>) {
  
  const fontWeights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
  };

  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'text-sm block mb-1.5',
        fontWeights[weight],
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
    </label>
  );
}
