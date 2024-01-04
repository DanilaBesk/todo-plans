'use client';

import { updateBoard } from '@/actions/update-board';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { Board } from '@prisma/client';
import { ElementRef, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({ data: boardData }: BoardTitleFormProps) => {
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(boardData.title);

  const disableEditing = () => {
    setIsEditing(false);
  };
  const enubleEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      const formTitle = formData.get('title') as string;
      if (formTitle === title) {
        return disableEditing();
      }
      execute({ title: formTitle, id: boardData.id });
    });
  };
  const onBlur = () => {
    if (inputRef.current?.value === title) {
      return disableEditing();
    }
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={handleSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none focus-visible:ring-offset-0"
          id="title"
          onBlur={onBlur}
          disabled={isPending}
          defaultValue={title}
          ref={inputRef}
        />
      </form>
    );
  }
  return (
    <Button
      onClick={enubleEditing}
      variant="transparent"
      className="font-bold text-lg p-1 px-2 h-auto w-auto"
    >
      {title}
    </Button>
  );
};
