'use client';

import { FormInput } from '@/components/form/form-input';
import { Layout } from 'lucide-react';
import { ElementRef, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Card } from '@prisma/client';
import { useAction } from '@/hooks/use-action';
import { updateCard } from '@/actions/update-card';
import { toast } from 'sonner';

interface HeaderProps {
  data: Card & { list: { title: string } };
}

export const Header = ({ data }: HeaderProps) => {
  const queryClient = useQueryClient();
  const params = useParams<{ boardId: string }>();

  const inputRef = useRef<ElementRef<'input'>>(null);
  const [title, setTitle] = useState<string>(data?.title);

  const { execute } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['card', data.id] });
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const handleSubmit = (formData: FormData) => {
    const formTitle = formData.get('title') as string;
    if (formTitle === title) {
      return;
    }
    execute({ title: formTitle, id: data.id, boardId: params.boardId });
  };

  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Layout className="h-5 w-5 text-neutral-700 mt-1" />
      <div className="w-full">
        <form action={handleSubmit}>
          <FormInput
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = function Skelet() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="w-6 h-6 mt-1 bg-neutral-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};
