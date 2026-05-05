CREATE TABLE codeerrors
(
    id VARCHAR(36) PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    shutdown_time INTEGER NOT NULL DEFAULT 0,
    error_date DATE NOT NULL,
    daily_report_id VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL,
    FOREIGN KEY (daily_report_id) REFERENCES dailyReports(id),
    UNIQUE (daily_report_id, code, error_date)
);

CREATE INDEX idx_codeerrors_daily_report_id ON codeerrors (daily_report_id);
CREATE INDEX idx_codeerrors_code ON codeerrors (code);