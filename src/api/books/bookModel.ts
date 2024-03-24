import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const BookSchema = z.object({
    id: z.number(),
    title: z.string(),
    auther: z.string(),
    publishedOn: z.date(),
    genre: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type Book = z.infer<typeof BookSchema>;


// Input Validation for 'GET books/:id' endpoint
export const GetBookSchema = z.object({
  params: z.object({ id: z
    .string()
    .refine((data) => !isNaN(Number(data)), 'ID must be a numeric value')
    .transform(Number)
    .refine((num) => num > 0, 'ID must be a positive number') }),
  query: z.object({
    title: z.string(),
    auther: z.string(),
    genre: z.string(), })
});