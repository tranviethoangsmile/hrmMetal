CREATE TABLE "orders" (
  "id" VARCHAR(36) PRIMARY KEY NOT NULL,
  "user_id" VARCHAR(36) NOT NULL REFERENCES "users" ("id"),
  "food_id" VARCHAR(36) NOT NULL REFERENCES "foods" ("id"),
  "canteen_id" VARCHAR(36) NOT NULL REFERENCES "canteens" ("id"),
  "created_at" DATE NOT NULL,
  "updated_at" DATE NOT NULL,
  "deleted_at" DATE NULL
);