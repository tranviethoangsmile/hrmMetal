CREATE TABLE fcm_tokens
(
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    user_id VARCHAR NOT NULL,
    fcm_token VARCHAR(255) NOT NULL,
    device_type VARCHAR(50) NOT NULL,
    app_version VARCHAR(20),
    device_id VARCHAR(255),
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL,
    FOREIGN KEY
    (user_id) REFERENCES users
    (id),
);
