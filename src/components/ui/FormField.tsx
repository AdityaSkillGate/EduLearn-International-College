import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export interface FormFieldProps {
  id?: string;
  htmlFor?: string;
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  helpText?: string;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  htmlFor,
  label,
  required = false,
  error,
  helperText,
  helpText,
  className,
  children,
}) => {
  const fieldId = id || htmlFor || '';
  const messageText = error ? null : (helpText || helperText);

  return (
    <div className={cn('space-y-1.5 text-left', className)}>
      <label
        htmlFor={fieldId}
        className="block text-xs font-semibold text-navy-900 tracking-wide"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>

      {children}

      {error ? (
        <p
          id={`${fieldId}-error`}
          role="alert"
          className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1"
        >
          <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : messageText ? (
        <p id={`${fieldId}-helper`} className="text-[11px] text-slate-500 mt-1">
          {messageText}
        </p>
      ) : null}
    </div>
  );
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={hasError ? 'true' : 'false'}
        className={cn(
          'w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-lg border text-navy-900 placeholder:text-slate-400 transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:border-gold-500',
          'disabled:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-500',
          hasError
            ? 'border-red-500 focus-visible:ring-red-400'
            : 'border-slate-300 hover:border-slate-400',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ hasError, className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        aria-invalid={hasError ? 'true' : 'false'}
        className={cn(
          'w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-lg border text-navy-900 transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:border-gold-500',
          'disabled:bg-slate-100 disabled:cursor-not-allowed',
          hasError
            ? 'border-red-500 focus-visible:ring-red-400'
            : 'border-slate-300 hover:border-slate-400',
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={hasError ? 'true' : 'false'}
        className={cn(
          'w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-lg border text-navy-900 placeholder:text-slate-400 transition-colors min-h-[90px]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:border-gold-500',
          'disabled:bg-slate-100 disabled:cursor-not-allowed',
          hasError
            ? 'border-red-500 focus-visible:ring-red-400'
            : 'border-slate-300 hover:border-slate-400',
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
