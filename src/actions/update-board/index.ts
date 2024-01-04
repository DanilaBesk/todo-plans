'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';

import { CreateSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';

import { UpdateBoardSchema } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: 'Unauthorized' };
  }
  const { title, id } = data;

  let board;
  try {
    board = await db.board.update({ where: { orgId, id }, data: { title } });
  } catch (error) {
    return { error: 'Failed to update.' };
  }
  revalidatePath(`/board/${id}`);
  return { data: board };
};
export const updateBoard = CreateSafeAction(UpdateBoardSchema, handler);
