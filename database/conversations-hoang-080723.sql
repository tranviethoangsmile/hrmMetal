CREATE TABLE conversations
(
    id VARCHAR PRIMARY KEY,
    title VARCHAR NULL DEFAULT 'New chat',
    member_count INTEGER NULL DEFAULT 2,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL
);