
import React from 'react';
import { cn } from '@/lib/utils';

export interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
  dismissible?: boolean;
  onClose?: () => void;
  className?: string;
}

export function Alert({
  title,
  children,
  variant = 'default',
  icon,
  dismissible = false,
  onClose,
  className,
  ...props
}: AlertProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>) {
  const variants = {
    default: 'bg-background border',
    success: 'bg-success/15 text-success-foreground border-success/30',
    warning: 'bg-warning/15 text-warning-foreground border-warning/30',
    error: 'bg-destructive/15 text-destructive-foreground border-destructive/30',
    info: 'bg-info/15 text-info-foreground border-info/30',
  };

  const getIcon = () => {
    if (icon) return icon;
    
    switch (variant) {
      case 'success':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        );
      case 'warning':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
      case 'error':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
      case 'info':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        );
      default:
        return null;
    }
  };

  const iconElement = getIcon();

  return (
    <div
      role="alert"
      className={cn(
        "relative rounded-md border p-4",
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="flex">
        {iconElement && (
          <div className="flex-shrink-0 mr-3 mt-0.5">
            {iconElement}
          </div>
        )}
        <div className="flex-1">
          {title && (
            <h5 className="text-sm font-medium mb-1">
              {title}
            </h5>
          )}
          <div className="text-sm">
            {children}
          </div>
        </div>
        {dismissible && onClose && (
          <button
            type="button"
            className="absolute top-4 right-4 inline-flex items-center justify-center rounded-md p-1 hover:bg-background/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
