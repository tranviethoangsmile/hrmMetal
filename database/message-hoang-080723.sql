CREATE TABLE messages
(
    id VARCHAR PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    sender_id VARCHAR(255) NOT NULL,
    conversation_id VARCHAR NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL,
    FOREIGN KEY (sender_id) REFERENCES users (id),
    FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);
