'use server';

import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

import { CreateSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';

import { DeleteListSchema } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: 'Unauthorized' };
  }
  const { id, boardId } = data;
  let list;
  try {
    list = await db.list.delete({
      where: { boardId, id, board: { orgId } },
    });
  } catch (error) {
    return { error: 'Failed to delete.' };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const deleteList = CreateSafeAction(DeleteListSchema, handler);
