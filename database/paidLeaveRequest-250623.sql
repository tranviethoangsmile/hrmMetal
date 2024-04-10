CREATE TABLE paidleaverequests
(
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    reason VARCHAR NOT NULL,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id),
    leader_id VARCHAR(36) NOT NULL REFERENCES users(id),
    admin_id VARCHAR(36) NULL REFERENCES users(id),
    is_confirm BOOLEAN DEFAULT false,
    is_approve BOOLEAN DEFAULT false,
    date_request VARCHAR(10) NOT NULL,
    feedback VARCHAR NULL,
    date_leave VARCHAR(10) NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL,
    is_paid BOOLEAN DEFAULT true,
    UNIQUE (user_id, date_leave)
);
