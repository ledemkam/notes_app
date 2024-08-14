import { z } from 'zod';
export const noteSchema = z.object({
    id: z.number(),
    title: z.string(),
    subtitle: z.string(),
    body_text: z.string(),
});

export type VNote = z.infer<typeof noteSchema>;