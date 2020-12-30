CREATE TABLE IF NOT EXISTS users (
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(32) NOT NULL,
    address VARCHAR(50) NOT NULL
)

CREATE TABLE IF NOT EXISTS favors (
    favor_id BIGSERIAL NOT NULL PRIMARY KEY,
    user_id --how to link to user table--
    title VARCHAR(20) NOT NULL,
    payment VARCHAR(20) NOT NULL,
    description VARCHAR(300) NOT NULL,
    --assign_to
    --assign_note
)