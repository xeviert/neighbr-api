CREATE TABLE IF NOT EXISTS users (
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(32) NOT NULL,
    address VARCHAR(50) NOT NULL
)