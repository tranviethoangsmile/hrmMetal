CREATE TABLE checkins
(
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id),
    time_in VARCHAR(255) NOT NULL,
    time_out VARCHAR(255),
    date VARCHAR(12) NOT NULL,
    is_weekend Boolean DEFAULT FALSE,
    is_checked Boolean DEFAULT FALSE,
    work_time FLOAT,
    go_out VARCHAR(255),
    go_in VARCHAR(255),
    over_time FLOAT,
    work_shift VARCHAR(255),
    created_at DATE NULL ,
    updated_at DATE NULL,
    deleted_at DATE NULL,
    UNIQUE
    (user_id, date)
);
