CREATE TABLE events
(
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    is_safety BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    date_end DATE NOT NULL,
    date_start DATE NOT NULL,
    position VARCHAR(10) NOT NULL,
    media VARCHAR(255) NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL
);