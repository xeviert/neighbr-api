CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(164) NOT NULL,
    address VARCHAR(50) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE favors (
    favor_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT,
    assign_to INT,
    title VARCHAR(20) NOT NULL,
    payment VARCHAR(20) NOT NULL,
    description VARCHAR(300) NOT NULL,
    posted TIMESTAMP DEFAULT now() NOT NULL,
    PRIMARY KEY(favor_id),
)