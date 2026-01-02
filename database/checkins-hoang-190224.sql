CREATE TABLE checkins
(
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id),
    time_in VARCHAR(255) NULL,
    time_out VARCHAR(255) NULL,
    date VARCHAR(12) NOT NULL,
    is_weekend Boolean DEFAULT FALSE,
    is_checked Boolean DEFAULT FALSE,
    is_paid_leave BOOLEAN DEFAULT FALSE,
    work_time FLOAT NULL,
    go_out VARCHAR(255)NULL,
    go_in VARCHAR(255) NULL,
    over_time FLOAT NULL,
    work_shift VARCHAR(255) NULL,
    created_at DATE NULL ,
    updated_at DATE NULL,
    deleted_at DATE NULL,
    UNIQUE
    (user_id, date)
);
-- ALTER TABLE checkins
-- ALTER time_in
-- DROP NOT NULL,
-- ADD is_paid_leave BOOLEAN DEFAULT FALSE;

