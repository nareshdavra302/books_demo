import type { Config } from "drizzle-kit";
import {env} from './src/common/utils/envConfig';

const { DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME } = env;

export default {
  schema: "./src/api/**/*Model.ts",
  out: "./drizzle",
  driver: 'mysql2',
  dbCredentials: {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
  }
} satisfies Config;