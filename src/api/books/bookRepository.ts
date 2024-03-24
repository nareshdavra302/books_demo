import { Book, BookDTO, BookSchema, booksModel } from '@/api/books/bookModel';
import { getDBConnection } from '@/common/utils/dbConnection';
import { and, asc, between, desc, gte, like, lte, or } from 'drizzle-orm';

export const books: Book[] = [
  { id: 1, title: 'Murder on Nile Book', auther: 'Robin Sharma', publishedOn: new Date('2020-06-01'), genre: 'thiller', createdAt: new Date(), updatedAt: new Date() },
  { id: 2, title: 'Vile king', auther: 'Rocky', publishedOn: new Date('2021-02-22'), genre: 'history', createdAt: new Date(), updatedAt: new Date() },
  { id: 3, title: 'Remote village', auther: 'Gonen Saga', publishedOn: new Date('2019-08-01'), genre: 'thiller', createdAt: new Date(), updatedAt: new Date() },
  { id: 4, title: 'Atomic science', auther: 'Bohn Ruth', publishedOn: new Date('2020-06-01'), genre: 'science', createdAt: new Date(), updatedAt: new Date() },
  { id: 5, title: 'My Book', auther: 'Naresh', publishedOn: new Date('2020-06-01'), genre: 'passion', createdAt: new Date(), updatedAt: new Date() },
];

export const bookRepository = {

  saveBooks: async (): Promise<any> => {

  },

  findAllAsync: async (bookDTO: BookDTO): Promise<any[]> => {

    const { title, auther, publishedFrom, publishedTo, genre, sortBy='title', sortOrder='asc', page=0, pageSize=100} = bookDTO;

    let titleCondition = like(booksModel.title, `%${title}%`)

    let  autherCondition = like(booksModel.auther, `%${auther}%`)    
    let  genreCondition = like(booksModel.genre, `%${genre}%`) 
    let  publishCondition = and(gte(booksModel.publishedOn, publishedFrom), lte(booksModel.publishedOn, publishedTo))

    let sortByTitle = sortOrder == 'asc' ? asc(booksModel.title) : desc(booksModel.title)
    let sortByAuther = sortOrder == 'asc' ? asc(booksModel.auther) : desc(booksModel.auther)
    let sortByPublish = sortOrder == 'asc' ? asc(booksModel.publishedOn) : desc(booksModel.publishedOn)
    
    let _sortOrder: any = sortByTitle;
    if(sortBy === 'title') { _sortOrder = sortByTitle; }
    if(sortBy === 'auther') { _sortOrder = sortByAuther; }
    if(sortBy === 'publication') { _sortOrder = sortByPublish; }
  

    const db = await getDBConnection();
    
    const books = await db.select({
      title: booksModel.title,
      auther: booksModel.auther,
      genre: booksModel.genre,
      publishedOn: booksModel.publishedOn,
    }).from(booksModel).where(or(titleCondition, autherCondition, publishCondition, genreCondition, publishCondition)).orderBy(_sortOrder).limit(pageSize).offset(page);

    db.end();
    return books;
  },

  findByIdAsync: async (id: number): Promise<Book | null> => {
    return books.find((book) => book.id === id) || null;
  },
};