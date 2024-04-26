CREATE TABLE inventorys
(
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    product VARCHAR(10) NOT NULL,
    department_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE NULL,
    UNIQUE(product, department_id)
);