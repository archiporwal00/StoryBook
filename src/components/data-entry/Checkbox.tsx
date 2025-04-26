
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { HelperText } from '../typography/HelperText';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
  error?: string;
  indeterminate?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    label,
    helperText,
    error,
    indeterminate,
    containerClassName,
    labelClassName,
    helperClassName,
    id,
    disabled,
    className,
    ...props 
  }, ref) => {
    const inputId = id || React.useId();
    const isInvalid = !!error;
    
    const inputRef = React.useRef<HTMLInputElement>(null);
    
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    
    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    return (
      <div className={cn('space-y-1.5', containerClassName)}>
        <div className="flex items-center space-x-2">
          <input
            id={inputId}
            ref={inputRef}
            type="checkbox"
            disabled={disabled}
            aria-invalid={isInvalid}
            aria-describedby={helperText || error ? `${inputId}-description` : undefined}
            className={cn(
              "h-4 w-4 shrink-0 rounded border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
              isInvalid && "border-destructive focus-visible:ring-destructive",
              className
            )}
            {...props}
          />
          {label && (
            <label 
              htmlFor={inputId} 
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                disabled && "cursor-not-allowed opacity-70",
                labelClassName
              )}
            >
              {label}
            </label>
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

Checkbox.displayName = 'Checkbox';

export { Checkbox };
