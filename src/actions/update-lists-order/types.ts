import { z } from 'zod';
import { List } from '@prisma/client';

import { ActionState } from '@/lib/create-safe-action';
import { UpdateListsOrderSchema } from './schema';

export type InputType = z.infer<typeof UpdateListsOrderSchema>;
export type ReturnType = ActionState<InputType, List[]>;
