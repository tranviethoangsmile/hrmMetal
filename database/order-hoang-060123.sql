CREATE TABLE "orders"
(
  "id" VARCHAR(36) PRIMARY KEY NOT NULL,
  "user_id" VARCHAR(36) NOT NULL REFERENCES "users" ("id"),
  "date" VARCHAR(12) NOT NULL,
  "dayOrNight" VARCHAR(10) NOT NULL,
  "isConfirmed" BOOLEAN DEFAULT false,
  "position" VARCHAR(10) NOT NULL,
  "created_at" DATE NOT NULL,
  "updated_at" DATE NOT NULL,
  "deleted_at" DATE NULL,
  UNIQUE (user_id, date)
);