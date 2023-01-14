CREATE TABLE foods (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  created_at DATE NULL,
  updated_at DATE NULL,
  deleted_at DATE NULL
);