CREATE TABLE dailyReports
(
    id VARCHAR(36) PRIMARY KEY,
    product VARCHAR(20) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    date DATE NOT NULL,
    shift VARCHAR NOT NULL,
    quantity INTEGER NOT NULL,
    good_quantity INTEGER NOT NULL,
    defective_quantity INTEGER NOT NULL,
    operator_history VARCHAR(255) NULL,
    operated_time INTEGER NOT NULL,
    shutdown_time INTEGER NOT NULL,
    cycle_time DECIMAL NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    department_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments (id),
    UNIQUE(product, user_id, date, shift)
);

    -- create unique for report;
--     ALTER TABLE dailyreports 
-- ADD CONSTRAINT unique_product_user_date UNIQUE (product, user_id, date);
