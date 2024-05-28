CREATE TABLE informations
(
    id VARCHAR(36) PRIMARY KEY,
    date VARCHAR (255) NOT NULL,
    user_id VARCHAR (255) NOT NULL,
    content TEXT NOT NULL,
    title VARCHAR (255) NOT NULL,
    media VARCHAR(255) NULL,
    position TEXT NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL,
    is_public BOOLEAN DEFAULT FALSE,
    is_event BOOLEAN DEFAULT FALSE,
    is_video BOOLEAN DEFAULT FALSE,
    FOREIGN KEY
    (user_id) REFERENCES users
    (id)
);

-- ALTER TABLE informations ADD COLUMN is_event BOOLEAN DEFAULT false;