import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { env } from "./envConfig";


export const getDBConnection = async () => {
    const { DB_HOST,
        DB_PORT,
        DB_USER,
        DB_PASSWORD,
        DB_NAME } = env;
    const connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        port: DB_PORT,
        database: DB_NAME
      });
      const db = drizzle(connection);
      return db;
}
