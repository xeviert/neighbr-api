BEGIN;

TRUNCATE favors;
INSERT INTO favors
    (title, payment, description)
VALUES
    ('Paint My House', 'my first born', 'Seriously, I do not want my first born'),
    ('Take Out Trash', '$10', 'Too fat to get out of bed. Please take out my trash'),
    ('Kill Cockroach', '$20', 'I will die if this thing lands on me');


COMMIT;