import { relations } from "drizzle-orm";
import {
  serial,
  varchar,
  timestamp,
  text,
  integer,
  primaryKey,
  json,
  boolean,
  real,
  unique,
  time,
  jsonb,
  pgSchema,
} from "drizzle-orm/pg-core";

export const schema = pgSchema("prueba_tecnica");

// Empieza aqui
// export const company = schema.table("user", {
export const userTable = schema.table("user", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }).notNull(),
});

// });