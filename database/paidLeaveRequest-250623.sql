CREATE TABLE paidleaverequests
(
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    reason VARCHAR NOT NULL,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id),
    leader_id VARCHAR(36) NOT NULL REFERENCES users(id),
    admin_id VARCHAR(36) NULL REFERENCES users(id),
    is_confirm BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT false,
    date_from VARCHAR(10) NOT NULL,
    feedback VARCHAR NULL,
    date_to VARCHAR(10) NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL,
    UNIQUE (user_id, date)
);
