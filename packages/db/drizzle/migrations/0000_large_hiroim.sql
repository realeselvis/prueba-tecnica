CREATE SCHEMA "prueba_tecnica";
--> statement-breakpoint
CREATE TABLE "prueba_tecnica"."user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_name_unique" UNIQUE("name")
);
