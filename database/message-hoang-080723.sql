CREATE TABLE messages
(
    id VARCHAR PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    conversation_id VARCHAR NOT NULL,
    is_unsend BOOLEAN NOT NULL DEFAULT FALSE,
    message_type VARCHAR NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);
