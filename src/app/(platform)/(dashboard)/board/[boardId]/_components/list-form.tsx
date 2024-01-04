'use client';

import { Plus, X } from 'lucide-react';
import { ElementRef, useRef, useState, useTransition } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { ListWrapper } from './list-wrapper';

import { createList } from '@/actions/create-list';
import { FormInput } from '@/components/form/form-input';
import { FormSubmit } from '@/components/form/form-submit';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const ListForm = ({ boardId }: { boardId: string }) => {
  const router = useRouter();
  const [_isPending, startTransition] = useTransition();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const enubleEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };
  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess(data) {
      toast.success(`List ${data.title} created`);
      disableEditing();
      router.refresh();
    },
    onError(error) {
      toast.error(error);
    },
  });
  const handleSubmit = (formData: FormData) =>
    startTransition(() => {
      const formTitle = formData.get('title') as string;
      execute({ title: formTitle, boardId });
    });

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={handleSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            errors={fieldErrors}
            autoComplete="off"
            id="title"
            ref={inputRef}
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
          />
          <div className="flex items-center gap-x-1 justify-between">
            <FormSubmit>Add list</FormSubmit>
            <Button
              className=""
              onClick={disableEditing}
              size="sm"
              variant="ghost"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transtion p-3 flex items-center font-medium text-sm"
        onClick={enubleEditing}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};
