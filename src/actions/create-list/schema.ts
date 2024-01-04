import { z } from 'zod';

export const CreateListSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(1, 'Title is so short.'),

  boardId: z.string(),
});
