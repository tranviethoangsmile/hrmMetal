CREATE TABLE planProductions
(
    id VARCHAR(36) PRIMARY KEY,
    department_id VARCHAR(36) NOT NULL,
    date VARCHAR(12) NOT NULL,
    position VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    product VARCHAR(20) NOT NULL,
    operation_time INTEGER NOT NULL,
    work_shift VARCHAR(255) NOT NULL,
    production_line VARCHAR(255) NOT NULL,
    is_custom BOOLEAN DEFAULT FALSE,
    FOREIGN KEY(department_id) REFERENCES departments(id),
    UNIQUE
    (department_id,work_shift,production_line, product, date)
);