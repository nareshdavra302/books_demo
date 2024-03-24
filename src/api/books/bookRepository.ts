import { Book, BookDTO, BookSchema, booksModel } from '@/api/books/bookModel';
import { getDBConnection } from '@/common/utils/dbConnection';
import { and, asc, between, desc, eq, gte, like, lte, or, sql } from 'drizzle-orm';



export const bookRepository = {

  saveBooks: async (): Promise<any> => {

  },

  findAllAsync: async (bookDTO: BookDTO): Promise<any[]> => {

    const { title, author, publishedFrom, publishedTo, genre, sortBy, sortOrder='asc', page, pageSize} = bookDTO;

    let titleCondition = like(booksModel.title, `%${title}%`)

   
    let _sortOrder;
    if(sortBy === 'title') { _sortOrder = (sortOrder == 'asc') ? asc(booksModel.title) : desc(booksModel.title) }
    if(sortBy === 'auther') { _sortOrder = (sortOrder == 'asc') ? asc(booksModel.author) : desc(booksModel.author) }
    if(sortBy === 'publication') { _sortOrder = (sortOrder == 'asc') ? asc(booksModel.publishedOn) : desc(booksModel.publishedOn) }
    if(!_sortOrder) { _sortOrder =  asc(booksModel.title) }
    let _pageSize = Number(pageSize) ?? 100
    let _page = Number(page) ?? 0
    if(!pageSize) {  }

    const db = await getDBConnection();
    
    const books = await db.select({
      title: booksModel.title,
      auther: booksModel.author,
      genre: booksModel.genre,
      publishedOn: booksModel.publishedOn,
    }).from(booksModel)
    .where(author ? sql`author LIKE CONCAT('%', ${author}, '%')` : undefined)
    .where(title ? sql`title LIKE CONCAT('%', ${title}, '%')` : undefined)
    .where(genre ? sql`title LIKE CONCAT('%', ${genre}, '%')` : undefined)
    .where(publishedFrom ? sql`published_on BETWEEN ${publishedFrom} AND ${publishedTo}` : undefined)
    .orderBy(_sortOrder)
    .limit(_pageSize).offset(_page);

    return books;
  },

  findByIdAsync: async (id: number): Promise<any | null> => {
    const db = await getDBConnection();
    const [book] = await db.select({
      title: booksModel.title,
      auther: booksModel.author,
      genre: booksModel.genre,
      publishedOn: booksModel.publishedOn,
    }).from(booksModel)
    .where(eq(booksModel.id, id))
    return book;
  },
};