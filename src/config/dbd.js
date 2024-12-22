import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(import.meta.env.VITE_PUBLIC_DB_CONNECTION_STRING);
export const dbd = drizzle(sql);
