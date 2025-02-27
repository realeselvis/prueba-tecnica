CREATE TABLE "prueba_tecnica"."user" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"phone" varchar(20),
	"email" varchar(255) NOT NULL
);
