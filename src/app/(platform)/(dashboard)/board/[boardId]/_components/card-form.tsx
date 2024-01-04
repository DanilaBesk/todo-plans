'use client';

import { createCard } from '@/actions/create-card';
import { FormSubmit } from '@/components/form/form-submit';
import { FormTextarea } from '@/components/form/form-textarea';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { Plus, X } from 'lucide-react';
import {
  ElementRef,
  KeyboardEventHandler,
  forwardRef,
  useRef,
  useTransition,
} from 'react';
import { toast } from 'sonner';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

interface CardFormProps {
  listId: string;
  boardId: string;
  enubleEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, boardId, enubleEditing, disableEditing, isEditing }, ref) => {
    const formRef = useRef<ElementRef<'form'>>(null);
    const [_isPending, startTransition] = useTransition();

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess(data) {
        toast.success(`card ${data.title} created`);
        formRef.current?.reset();
      },
      onError(error) {
        toast.error(error);
      },
    });
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') disableEditing();
    };
    useEventListener('keydown', onKeyDown);
    useOnClickOutside(formRef, disableEditing);
    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const handleSubmit = (formData: FormData) => {
      startTransition(() => {
        const formTitle = formData.get('title') as string;
        execute({ title: formTitle, listId, boardId });
      });
    };

    if (isEditing) {
      return (
        <form
          action={handleSubmit}
          className="py-0.5 m-1 px-1 space-y-4"
          ref={formRef}
        >
          <FormTextarea
            id="title"
            onKeyDown={onTextareaKeyDown}
            onBlur={() => {}}
            ref={ref}
            placeholder="Enter a title for this card..."
            errors={fieldErrors}
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enubleEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          variant="ghost"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);
CardForm.displayName = 'CardForm';
