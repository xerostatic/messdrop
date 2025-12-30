import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export { schema };

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  
  const sql = neon(databaseUrl);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return drizzle(sql as any, { schema });
}

