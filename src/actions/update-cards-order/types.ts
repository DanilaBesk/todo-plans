import { z } from 'zod';
import { Card } from '@prisma/client';

import { ActionState } from '@/lib/create-safe-action';
import { UpdateCardsOrderSchema } from './schema';

export type InputType = z.infer<typeof UpdateCardsOrderSchema>;
export type ReturnType = ActionState<InputType, Card[]>;
