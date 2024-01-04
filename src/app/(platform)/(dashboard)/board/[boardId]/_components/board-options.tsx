'use client';

import { Button } from '@/components/ui/button';
import { MoreHorizontal, X } from 'lucide-react';

import { deleteBoard } from '@/actions/delete-board';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAction } from '@/hooks/use-action';
import { toast } from 'sonner';

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onSuccess() {
      toast.success('Board deleted');
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="p-2 w-auto h-auto">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="px-0 py-3">
        <div className="text-sm font-medium text-center text-neutral-600">
          Boards actions
        </div>
        <PopoverClose asChild>
          <Button
            variant="ghost"
            className="absolute top-2 right-2 w-auto h-auto p-2 text-neutral-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onDelete}
          variant="ghost"
          className="text-sm rounded-none h-auto w-full p-2 px-5 justify-start font-normal"
          disabled={isLoading}
        >
          Delete this board
        </Button>
        {/* <Button
          onClick={onCopy}
          variant="ghost"
          className="text-sm rounded-none h-auto w-full p-2 px-5 justify-start font-normal"
          disabled={isLoading}
        >
          Copy this board
        </Button> */}
      </PopoverContent>
    </Popover>
  );
};
