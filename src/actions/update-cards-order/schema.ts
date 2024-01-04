import { z } from 'zod';

export const UpdateCardsOrderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      listId: z.string(),
      order: z.number(),
    })
  ),
  boardId: z.string(),
});
