import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { notFound, redirect } from 'next/navigation';
import { BoardNavbar } from './_components/board-navbar';

type BoardIdProps = {
  children: React.ReactNode;
  params: { boardId: string };
};

export const generateMetadata = async ({
  params,
}: {
  params: { boardId: string };
}) => {
  const { orgId } = auth();
  if (!orgId) {
    return 'Board';
  }
  const board = await db.board.findUnique({
    where: { id: params.boardId, orgId },
  });
  return {
    title: board?.title || 'Board',
  };
};

const BoardIdLayout = async ({ children, params }: BoardIdProps) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect('/select-org');
  }
  const board = await db.board.findUnique({
    where: { id: params.boardId, orgId },
  });
  if (!board) {
    notFound();
  }
  console.log('render lay');
  return (
    <div
      className="relative h-full bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <BoardNavbar data={board} />
      <main className="pt-28 relative h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
