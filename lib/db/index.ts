import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Cache the db instance
let dbInstance: NeonHttpDatabase<typeof schema> | null = null;

export function getDb(): NeonHttpDatabase<typeof schema> {
  if (dbInstance) return dbInstance;
  
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  
  dbInstance = drizzle(neon(databaseUrl), { schema });
  return dbInstance;
}

// Export db as a getter that lazily initializes
export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_target, prop: string | symbol) {
    const instance = getDb();
    const value = (instance as unknown as Record<string | symbol, unknown>)[prop];
    if (typeof value === "function") {
      return value.bind(instance);
    }
    return value;
  },
});

