import {getDBConnection} from '@/common/utils/dbConnection'
import { booksModel } from '@/api/books/bookModel';
export const books = [
    { id: 1, title: 'Murder on Nile Book', auther: 'Robin Sharma', publishedOn: new Date('2020-06-01'), genre: 'thiller', createdAt: new Date(), updatedAt: new Date() },
    { id: 2, title: 'Vile king', auther: 'Rocky', publishedOn: new Date('2021-02-22'), genre: 'history', createdAt: new Date(), updatedAt: new Date() },
    { id: 3, title: 'Remote village', auther: 'Gonen Saga', publishedOn: new Date('2019-08-01'), genre: 'thiller', createdAt: new Date(), updatedAt: new Date() },
    { id: 4, title: 'Atomic science', auther: 'Bohn Ruth', publishedOn: new Date('2020-06-01'), genre: 'science', createdAt: new Date(), updatedAt: new Date() },
    { id: 5, title: 'My Book', auther: 'Naresh', publishedOn: new Date('2020-06-01'), genre: 'passion', createdAt: new Date(), updatedAt: new Date() },
  ];
const main = async () => {
    
    const db = await getDBConnection();

        console.log("Seed start");
        await db.insert(booksModel).values(books);
        console.log("Seed done");
};

main();