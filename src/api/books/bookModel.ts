import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { int, text, mysqlTable, uniqueIndex, varchar, serial, date, timestamp } from 'drizzle-orm/mysql-core';
// declaring enum in database

export const books = mysqlTable('books', {
  id: serial("id").primaryKey(),
  title: varchar('title', { length: 256 }),
  auther: text('auther'),
  publishedOn: date('published_on'),
  genre: varchar('genre', { length: 256 }),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
}, (books) => ({
  nameIndex: uniqueIndex('title_idx').on(books.title),
}));

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
    .refine((num) => num > 0, 'ID must be a positive number').optional() }),
  query: z.object({
    title: z.string().optional(),
    auther: z.string().optional(),
    genre: z.string().optional(), 
    publishedFrom: z.date().optional(),
    publishedTo: z.date().optional(),
    page: z.number().max(500).optional(),
    pageSize: z.number().min(10).max(100).optional(),
  }).strict()
});