'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';

import { CreateSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';

import { UpdateListsOrderSchema } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: 'Unauthorized' };
  }

  const { boardId, items } = data;
  let lists;
  try {
    lists = await db.$transaction(
      items.map((list) =>
        db.list.update({
          where: {
            id: list.id,
            board: {
              orgId,
            },
          },
          data: { order: list.order },
        })
      )
    );
  } catch (error) {
    return { error: 'Failed to reorder.' };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: lists };
};
export const updateListsOrder = CreateSafeAction(
  UpdateListsOrderSchema,
  handler
);
