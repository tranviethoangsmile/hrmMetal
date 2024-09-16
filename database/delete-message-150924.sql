CREATE TABLE delete_messages
(
    id VARCHAR NOT NULL PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    message_id VARCHAR(36) NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(message_id) REFERENCES messages(id)
);