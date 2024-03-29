CREATE TABLE users
(
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  user_name VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  dob DATE NOT NULL DEFAULT NOW(),
  phone VARCHAR(11) NULL,
  avatar VARCHAR(255) NULL,
  ic_id VARCHAR(30) NULL UNIQUE,
  employee_id INTEGER NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT false,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  is_officer BOOLEAN NOT NULL DEFAULT false,
  role VARCHAR(255) NOT NULL DEFAULT 'STAFF',
  position VARCHAR(255) NOT NULL DEFAULT 'HINO',
  department_id VARCHAR(36) NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL,
  deleted_at DATE NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);



CREATE TABLE departments
(
  id VARCHAR PRIMARY KEY,
  name VARCHAR(255)
);