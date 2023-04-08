CREATE TABLE "user" (
    id INT GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(164) NOT NULL,
    address VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE "favor" (
    favor_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT,
    assign_to INT,
    title VARCHAR(20) NOT NULL,
    payment VARCHAR(20) NOT NULL,
    description VARCHAR(300) NOT NULL,
    posted TIMESTAMPTZ DEFAULT now() NOT NULL,
    PRIMARY KEY(favor_id)
);