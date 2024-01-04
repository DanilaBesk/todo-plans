import { Board } from '@prisma/client';
import { BoardTitleForm } from './board-title-form';
import { BoardOptions } from './board-options';

interface BoardNavbarProps {
  data: Board;
}

export const BoardNavbar = ({ data }: BoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-50 bg-black/50 flex items-center justify-between fixed top-14 px-6 gap-x-4 text-white">
      <div className="w-full overflow-x-auto scrollbar-hide">
        <BoardTitleForm data={data} />
      </div>
      <BoardOptions id={data.id} />
    </div>
  );
};
