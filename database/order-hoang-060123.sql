CREATE TABLE "orders"
(
  "id" VARCHAR(36) PRIMARY KEY NOT NULL,
  "user_id" VARCHAR(36) NOT NULL REFERENCES "users" ("id"),
  "date" VARCHAR(10) NOT NULL,
  "dayOrNight" VARCHAR(10) NOT NULL,
  "isConfirmed" BOOLEAN DEFAULT false,
  "canteen_id" VARCHAR(36) NOT NULL REFERENCES "canteens" ("id"),
  "created_at" DATE NOT NULL,
  "updated_at" DATE NOT NULL,
  "deleted_at" DATE NULL,
  UNIQUE (user_id, date)
);