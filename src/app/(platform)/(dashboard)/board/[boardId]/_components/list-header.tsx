'use client';

import { updateList } from '@/actions/update-list';
import { FormInput } from '@/components/form/form-input';
import { useAction } from '@/hooks/use-action';
import { List } from '@prisma/client';
import { ElementRef, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useEventListener } from 'usehooks-ts';
import { ListOptions } from './list-options';

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(data.title);

  const [isPending, startTransition] = useTransition();

  const inputRef = useRef<ElementRef<'input'>>(null);
  const formRef = useRef<ElementRef<'form'>>(null);

  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };
  useEventListener('keydown', onKeyDown);

  const onBlur = () => {
    if (inputRef.current?.value === title) {
      return disableEditing();
    }
    formRef.current?.requestSubmit();
  };

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success('Renamed to ' + data.title);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const handleSubmit = (formData: FormData) =>
    startTransition(() => {
      const formTitle = formData.get('title') as string;
      if (formTitle === title) {
        disableEditing();
      }
      execute({ title: formTitle, id: data.id, boardId: data.boardId });
    });

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form action={handleSubmit} className="flex-1 px-[2px]" ref={formRef}>
          <FormInput
            onBlur={onBlur}
            className="text-sm rounded-sm px-[7px] py-1 h-7 font-medium border-transparent transition bg-transparent focus:bg-white focus-visible:ring-transparent"
            id="title"
            autoComplete="off"
            ref={inputRef}
            placeholder="Enter list title"
            defaultValue={title}
            disabled={isPending}
          />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium truncate border-transparent"
        >
          {title}
        </div>
      )}
      <ListOptions onAddCard={onAddCard} data={data} />
    </div>
  );
};
