CREATE TABLE informations
(
    id VARCHAR(36) PRIMARY KEY,
    date VARCHAR (255) NOT NULL,
    user_id VARCHAR (255) NOT NULL,
    content TEXT NOT NULL,
    title VARCHAR (255) NOT NULL,
    image VARCHAR(255) NULL,
    position TEXT NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL,
    FOREIGN KEY
    (user_id) REFERENCES users
    (id)
);