CREATE TABLE codeerrors(
    id VARCHAR PRIMARY KEY,
    code VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    shutdown_time INTEGER NOT NULL,
    daily_report_id VARCHAR(255),
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL,
    FOREIGN KEY(daily_report_id) REFERENCES dailyreports(id)
);