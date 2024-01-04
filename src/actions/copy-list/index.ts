'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';

import { CreateSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';

import { CopyListSchema } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: 'Unauthorized' };
  }

  const { id, boardId } = data;
  let list;
  try {
    const targetList = await db.list.findUnique({
      where: { boardId, id, board: { orgId } },
      include: { cards: true },
    });
    if (!targetList) {
      return { error: 'List not found' };
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
        boardId: targetList.boardId,
        title: `${targetList.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: targetList.cards.map((card) => ({
              title: card.title,
              order: card.order,
              description: card.description,
            })),
          },
        },
      },
      include: { cards: true },
    });

    console.log(list);
  } catch (error) {
    return { error: 'Failed to copy.' };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: list };
};
export const copyList = CreateSafeAction(CopyListSchema, handler);
