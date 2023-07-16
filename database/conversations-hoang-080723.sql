CREATE TABLE conversations
(
    id VARCHAR PRIMARY KEY,
    name VARCHAR,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL,
);