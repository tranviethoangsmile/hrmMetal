CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    ic_card VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    shift CHAR(1) NOT NULL,
    date DATE NOT NULL,
    quantity INTEGER NOT NULL,
    day_code VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
