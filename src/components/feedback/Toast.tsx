import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  duration?: number;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose: (id: string) => void;
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
}

export function Toast({
  id,
  title,
  description,
  variant = 'default',
  duration = 5000,
  icon,
  action,
  onClose,
  position = 'bottom-right',
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (duration === Infinity) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        onClose(id);
      }, 300); // Animation duration

      return () => clearTimeout(timer);
    }
  }, [isVisible, id, onClose]);

  const variants = {
    default: 'bg-background border',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-destructive text-destructive-foreground',
    info: 'bg-info text-info-foreground',
  };

  if (!isMounted) return null;

  return createPortal(
    <div
      role="status"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
      className={cn(
        "rounded-md shadow-lg p-4 pointer-events-auto w-full max-w-sm",
        variants[variant],
        isVisible ? "animate-fade-in" : "animate-fade-out",
      )}
    >
      <div className="flex items-start gap-3">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div className="flex-1">
          {title && (
            <div className="font-semibold">
              {title}
            </div>
          )}
          {description && (
            <div className="text-sm mt-1">
              {description}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {action}
          <button
            onClick={() => setIsVisible(false)}
            className="rounded-md p-1 hover:bg-accent hover:text-accent-foreground"
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
        </div>
      </div>
    </div>,
    document.body
  );
}

export interface ToastManagerProps {
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  gap?: number;
}

export function ToastManager({ 
  position = 'bottom-right', 
  gap = 8, 
  toasts = [], 
  onClose 
}: {
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center',
  gap?: number,
  toasts?: Omit<ToastProps, 'onClose'>[],
  onClose?: (id: string) => void
}) {
  const positionClasses = {
    'top-left': 'top-0 left-0 items-start',
    'top-right': 'top-0 right-0 items-start',
    'top-center': 'top-0 left-1/2 -translate-x-1/2 items-start',
    'bottom-left': 'bottom-0 left-0 items-end',
    'bottom-right': 'bottom-0 right-0 items-end',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 items-end',
  };

  return createPortal(
    <div
      className={cn(
        "fixed flex flex-col p-4 space-y-2 z-50 max-h-screen overflow-hidden",
        positionClasses[position]
      )}
      style={{ gap: `${gap}px` }}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={onClose || (() => {})}
          position={position}
        />
      ))}
    </div>,
    document.body
  );
}
