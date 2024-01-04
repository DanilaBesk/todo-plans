'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';

import { CreateSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';

import { UpdateCardsOrderSchema } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: 'Unauthorized' };
  }

  const { boardId, items } = data;
  let updatedCardsOrder;
  try {
    updatedCardsOrder = await db.$transaction(
      items.map((card) =>
        db.card.update({
          where: {
            id: card.id,
            list: {
              board: {
                orgId,
              },
            },
          },
          data: {
            order: card.order,
            listId: card.listId,
          },
        })
      )
    );
  } catch (error) {
    return { error: 'Failed to reorder.' };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: updatedCardsOrder };
};
export const updateCardsOrder = CreateSafeAction(
  UpdateCardsOrderSchema,
  handler
);
