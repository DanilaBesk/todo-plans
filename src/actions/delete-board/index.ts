'use server';

import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

import { CreateSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';

import { DeleteBoardSchema } from './schema';
import { InputType, ReturnType } from './types';
import { redirect } from 'next/navigation';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: 'Unauthorized' };
  }
  const { id } = data;
  let board;
  try {
    board = await db.board.delete({
      where: { orgId, id },
    });
  } catch (error) {
    return { error: 'Failed to delete.' };
  }
  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = CreateSafeAction(DeleteBoardSchema, handler);
