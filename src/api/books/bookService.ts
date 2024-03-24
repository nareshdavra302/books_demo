import { StatusCodes } from 'http-status-codes';

import { Book } from '@/api/books/bookModel';
import { bookRepository } from '@/api/books/bookRepository';
import { ResponseStatus, ServiceResponse } from '@/common/utils/commonRespose';
import { logger } from '@/server';

export const bookService = {
  // Retrieves all books from the database
  findAll: async (title: string| undefined, auther: string| undefined): Promise<ServiceResponse<Book[] | null>> => {
    try {
      const books = await bookRepository.findAllAsync(title, auther);
      if (!books) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Books found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Book[]>(ResponseStatus.Success, 'Books found', books, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all books: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves a single book by their ID
  findById: async (id: number): Promise<ServiceResponse<Book | null>> => {
    try {
      const book = await bookRepository.findByIdAsync(id);
      if (!book) {
        return new ServiceResponse(ResponseStatus.Failed, 'Book not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Book>(ResponseStatus.Success, 'Book found', book, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding book with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};