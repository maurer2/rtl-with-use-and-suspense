import { z } from 'zod';

export const searchParamsSchema = z.object({
  offset: z.any().optional().pipe(z.coerce.number()).catch(0),
  limit: z.any().optional().pipe(z.coerce.number()).catch(10),
});
