CREATE TABLE paidleaverequests
(
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    date VARCHAR(10) NOT NULL,
    reason VARCHAR NOT NULL,
    staff_id VARCHAR(36) NOT NULL REFERENCES users(id),
    leader_id VARCHAR(36) NOT NULL REFERENCES users(id),
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL,
    UNIQUE (staff_id, date)
);

ALTER TABLE paidleaverequests
ADD COLUMN is_active BOOLEAN DEFAULT false;
