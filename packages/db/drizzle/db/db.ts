import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../schema";
import postgres from "postgres";
import dotenv from 'dotenv';
dotenv.config();

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client, { schema })

export type DB = typeof db;