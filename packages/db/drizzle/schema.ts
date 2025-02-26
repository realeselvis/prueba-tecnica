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
// });