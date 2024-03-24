import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { GetBookSchema, BookSchema, BookDTO } from '@/api/books/bookModel';
import { bookService } from '@/api/books/bookService';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httphandlers';

export const bookRegistry = new OpenAPIRegistry();

bookRegistry.register('Books', BookSchema);

export const bookController: Router = (() => {
  const router = express.Router();

  bookRegistry.registerPath({
    method: 'get',
    path: '/books',
    tags: ['Book'],
    request: { query: GetBookSchema.shape.query },
    responses: createApiResponse(z.array(BookSchema), 'Success'),
  });

  router.get('/', validateRequest(GetBookSchema),async (req: Request, res: Response) => {
    
    const bookDTO: BookDTO = req.query;

    const serviceResponse = await bookService.findAll(bookDTO);
    handleServiceResponse(serviceResponse, res);
  });

  bookRegistry.registerPath({
    method: 'get',
    path: '/books/{id}',
    tags: ['Book'],
    request: { params: GetBookSchema.shape.params },
    responses: createApiResponse(BookSchema, 'Success'),
  });

  router.get('/:id', validateRequest(GetBookSchema), async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10);

    const serviceResponse = await bookService.findById(id);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();