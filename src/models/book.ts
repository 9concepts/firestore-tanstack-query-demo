import { z } from 'zod'

export const Book = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
})

export type Book = z.infer<typeof Book>
