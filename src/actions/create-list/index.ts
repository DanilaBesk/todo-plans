'use server';
import { auth } from '@clerk/nextjs';

import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { CreateSafeAction } from '@/lib/create-safe-action';
import { CreateListSchema } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: 'Unauthorized' };
  }
  const { title, boardId } = data;

  let list;
  try {
    const board = await db.board.findUnique({
      where: { id: boardId, orgId },
    });
    if (!board) {
      return { error: 'Board not found' };
    }
    const lastOrder = (
      await db.list.aggregate({
        where: { boardId },
        _max: { order: true },
      })
    )._max.order;
    const newOrder = lastOrder ? lastOrder + 1 : 1;

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: 'Failed to create' };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: list };
};

export const createList = CreateSafeAction(CreateListSchema, handler);
