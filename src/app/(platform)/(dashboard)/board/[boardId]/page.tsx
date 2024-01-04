import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ListsContainer } from './_components/lists-container';

interface BoardIdProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdProps) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect('/select-org');
  }
  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListsContainer data={lists} boardId={params.boardId} />
    </div>
  );
};

export default BoardIdPage;
