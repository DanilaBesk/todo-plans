'use client';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { toast } from 'sonner';

import { createBoard } from '@/actions/create-board';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ElementRef, useRef } from 'react';

import { FormInput } from './form-input';
import { FormPicker } from './form-picker';
import { FormSubmit } from './form-submit';

interface FormPopoverProps {
  children: React.ReactNode;
  side?: 'right' | 'left' | 'bottom' | 'top';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side = 'bottom',
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<'button'>>(null);

  const { execute, fieldErrors, isLoading } = useAction(createBoard, {
    onSuccess(data) {
      toast.success('Board create success');
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError(error) {
      toast.error(error);
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const image = formData.get('image') as string;
    execute({ title, image });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-80 pt-3"
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create board
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className="p-2 h-auto w-auto absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              errors={fieldErrors}
              disabled={isLoading}
              id="title"
              label="Board title"
              type="text"
            />
            <FormSubmit disabled={isLoading} className="w-full">
              Create
            </FormSubmit>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
