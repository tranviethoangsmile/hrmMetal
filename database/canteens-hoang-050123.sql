CREATE TABLE canteens
(
  id VARCHAR(36) PRIMARY KEY,
  factory_name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL,
  deleted_at DATE NULL
);

