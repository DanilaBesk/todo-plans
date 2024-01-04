'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';

import { CreateSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';

import { UpdateListSchema } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: 'Unauthorized' };
  }

  const { title, id, boardId } = data;
  let list;
  try {
    list = await db.list.update({
      where: { boardId, id, board: { orgId } },
      data: { title },
    });
  } catch (error) {
    return { error: 'Failed to update.' };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: list };
};
export const updateList = CreateSafeAction(UpdateListSchema, handler);
