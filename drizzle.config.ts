import type { Config } from "drizzle-kit";
export default {
  schema: "./src/api/**/*Model.ts",
  out: "./drizzle",
} satisfies Config;