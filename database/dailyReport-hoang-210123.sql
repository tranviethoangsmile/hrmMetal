CREATE TABLE dailyReports
(
    id VARCHAR PRIMARY KEY,
    product VARCHAR NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    quantity INTEGER NOT NULL,
    operator_history VARCHAR(255),
    operated_time INTEGER NOT NULL,
    shutdown_time INTEGER NOT NULL,
    active_time INTEGER NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
