
import React from 'react';
import { cn } from '@/lib/utils';

interface HelperTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'error' | 'success';
}

export function HelperText({
  children,
  className,
  variant = 'default',
  ...props
}: HelperTextProps & React.HTMLAttributes<HTMLParagraphElement>) {
  
  const variants = {
    default: 'text-muted-foreground',
    error: 'text-destructive',
    success: 'text-success',
  };

  return (
    <p
      className={cn(
        'text-sm mt-1.5',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
