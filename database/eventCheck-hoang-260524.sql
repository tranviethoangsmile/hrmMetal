CREATE TABLE event_checks
(
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    user_id VARCHAR (255) NOT NULL,
    event_id VARCHAR (255) NOT NULL,
    is_confirm BOOLEAN DEFAULT FALSE,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL,
    FOREIGN KEY
    (user_id) REFERENCES users
    (id),
    FOREIGN KEY
    (event_id) REFERENCES events
    (id),
    UNIQUE
    (user_id, event_id)
);