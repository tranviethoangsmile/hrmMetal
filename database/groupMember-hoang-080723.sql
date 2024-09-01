CREATE TABLE groupmembers
(
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR NOT NULL,
  conversation_id VARCHAR NOT NULL,
  joined_at DATE NOT NULL,
  role VARCHAR(45) NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL,
  deleted_at DATE NULL,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);