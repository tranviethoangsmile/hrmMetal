CREATE TABLE trainnings
(
    id VARCHAR(255) PRIMARY KEY ,
    trainning_name VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    media_path VARCHAR(255) NOT NULL,
    user_id VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE trainnings
ALTER COLUMN media_path TYPE
TEXT[]
USING ARRAY[media_path];
