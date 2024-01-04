'use client';

import { copyList } from '@/actions/copy-list';
import { deleteList } from '@/actions/delete-list';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useAction } from '@/hooks/use-action';
import { List } from '@prisma/client';
import { Copy, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import { ElementRef, useRef, useTransition } from 'react';
import { toast } from 'sonner';

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);
  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess(data) {
      toast.success(`List "${data.title}" deleted`);
      closeRef.current?.click();
    },
    onError(error) {
      toast.error(error);
    },
  });
  const { execute: executeCopy } = useAction(copyList, {
    onSuccess(data) {
      toast.success(`List "${data.title}" copied`);
      closeRef.current?.click();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const [isPending, startTransition] = useTransition();

  const onDeleteHandle = () => {
    startTransition(() => {
      executeDelete({ id: data.id, boardId: data.boardId });
    });
  };
  const onCopyHandle = () => {
    startTransition(() => {
      executeCopy({ id: data.id, boardId: data.boardId });
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-[40px] rounded-sm"
        side="bottom"
        sideOffset={0}
        align="start"
      >
        <PopoverClose ref={closeRef} className="hidden" />
        <Button
          variant="ghost"
          className="w-full flex items-center justify-center mx-auto p-2 text-neutral-600"
          onClick={onAddCard}
          disabled={isPending}
        >
          <Plus className="w-5 h-5" />
        </Button>

        <Separator className="h-[0.675px]" />

        <Button
          onClick={onCopyHandle}
          className="h-auto w-full flex items-center justify-center mx-auto p-2 text-neutral-600"
          variant="ghost"
          disabled={isPending}
        >
          <Copy className="w-5 h-5" />
        </Button>

        <Separator className="h-[0.675px]" />

        <Button
          onClick={onDeleteHandle}
          className="w-full flex items-center justify-center mx-auto p-2 text-neutral-600"
          variant="ghost"
          disabled={isPending}
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </PopoverContent>
    </Popover>
  );
};
