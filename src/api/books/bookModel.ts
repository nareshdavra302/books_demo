import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { int, text, mysqlTable, uniqueIndex, varchar, serial, date, timestamp } from 'drizzle-orm/mysql-core';
// declaring enum in database

export const booksModel = mysqlTable('books', {
  id: serial("id").primaryKey(),
  title: varchar('title', { length: 256 }),
  author: text('auther'),
  publishedOn: date('published_on'),
  genre: varchar('genre', { length: 30 }),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
}, (books) => ({
  nameIndex: uniqueIndex('title_idx').on(books.title),
}));

extendZodWithOpenApi(z);

export const BookSchema = z.object({
    id: z.number(),
    title: z.string(),
    author: z.string(),
    publishedOn: z.date(),
    genre: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type Book = z.infer<typeof BookSchema>;


const querySchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  genre: z.string().optional(), 
  publishedFrom: z.date().optional(),
  publishedTo: z.date().optional(),
  page: z.string().refine((data) => !isNaN(Number(data)), 'ID must be a numeric value').optional(),
  pageSize: z.string().refine((data) => !isNaN(Number(data)), 'ID must be a numeric value').optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional()
})

export type BookDTO = z.infer<typeof querySchema>;

// Input Validation for 'GET books/:id' endpoint
export const GetBookSchema = z.object({
  params: z.object({ id: z
    .string()
    .refine((data) => !isNaN(Number(data)), 'ID must be a numeric value')
    .transform(Number)
    .refine((num) => num > 0, 'ID must be a positive number').optional() }),
  query: querySchema.strict()
});

