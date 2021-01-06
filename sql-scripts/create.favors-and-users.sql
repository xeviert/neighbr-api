DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS favors;

CREATE TABLE users (
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(164) NOT NULL,
    address VARCHAR(50) NOT NULL
);

CREATE TABLE favors (
    favor_id BIGSERIAL NOT NULL PRIMARY KEY,
    user_id BIGSERIAL REFERENCES users(user_id) NOT NULL,
    title VARCHAR(20) NOT NULL,
    payment VARCHAR(20) NOT NULL,
    description VARCHAR(300) NOT NULL,
    posted DATE DEFAULT now()
)

-- add column to favors table that'll link assign to and assign note to a different user than the one that posted