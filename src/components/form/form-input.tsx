'use client';

import { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormError } from './form-error';

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
  autoComplete?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled = false,
      errors,
      className,
      defaultValue = '',
      onBlur,
      autoComplete,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    console.log('input');
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}
          <Input
            onBlur={onBlur}
            defaultValue={defaultValue}
            placeholder={placeholder}
            type={type}
            ref={ref}
            required={required}
            id={id}
            name={id}
            disabled={pending || disabled}
            className={cn('text-sm px-2 py-1 h-7', className)}
            aria-describedby={`${id}-error`}
            autoComplete={autoComplete}
          />
        </div>
        <FormError id={id} errors={errors} />
      </div>
    );
  }
);

FormInput.displayName = 'FromInput';
