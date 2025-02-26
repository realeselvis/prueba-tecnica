import { config } from "dotenv";
import { resolve } from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres  from "postgres";

config({ path: resolve(__dirname, "../../../.env") });

const migrationClient = postgres(process.env.DATABASE_URL!, {
    max: 1,
});

console.log(process.env.DATABASE_URL);

async function main() {
  try {
      await migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle/migrations" });
      console.log("Migration completed successfully");
  } catch (error) {
      console.error("Migration failed:", error);
  } finally {
      await migrationClient.end();
  }
}
main();