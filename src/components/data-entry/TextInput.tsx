
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '../typography/Label';
import { HelperText } from '../typography/HelperText';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperClassName?: string;
  leftIconClassName?: string;
  rightIconClassName?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ 
    label,
    helperText,
    error,
    leftIcon,
    rightIcon,
    containerClassName,
    labelClassName,
    inputClassName,
    helperClassName,
    leftIconClassName,
    rightIconClassName,
    id,
    required,
    disabled,
    className,
    ...props 
  }, ref) => {
    const inputId = id || React.useId();
    const isInvalid = !!error;

    return (
      <div className={cn('space-y-1.5', containerClassName)}>
        {label && (
          <Label 
            htmlFor={inputId}
            required={required}
            className={cn('mb-1.5', labelClassName)}
          >
            {label}
          </Label>
        )}
        <div className="relative">
          {leftIcon && (
            <div 
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground", 
                leftIconClassName
              )}
            >
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            aria-invalid={isInvalid}
            aria-describedby={helperText ? `${inputId}-description` : undefined}
            className={cn(
              "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              isInvalid && "border-destructive focus-visible:ring-destructive",
              inputClassName,
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div 
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground", 
                rightIconClassName
              )}
            >
              {rightIcon}
            </div>
          )}
        </div>
        {(helperText || error) && (
          <HelperText 
            id={`${inputId}-description`}
            variant={isInvalid ? 'error' : 'default'}
            className={cn('mt-1.5', helperClassName)}
          >
            {error || helperText}
          </HelperText>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export { TextInput };
