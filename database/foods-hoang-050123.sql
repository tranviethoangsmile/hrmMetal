CREATE TABLE foods (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  createdAt DATE NULL,
  updatedAt DATE NULL,
  deletedAt DATE NULL
);