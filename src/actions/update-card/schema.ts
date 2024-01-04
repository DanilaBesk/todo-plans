import { z } from 'zod';

export const UpdateCardSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(1, { message: 'Title is too short' }),
  id: z.string(),
  description: z.optional(
    z.string({
      invalid_type_error: 'Invalid type error in Description',
    })
  ),
  boardId: z.string(),
});
