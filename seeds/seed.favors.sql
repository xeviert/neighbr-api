BEGIN;

TRUNCATE "favor";
INSERT INTO "favor"
    ("user_id", "title", "payment", "description")
VALUES
    (2, 'Paint My House', 'my first born', 'Seriously, I do not want my first born'),
    (1, 'Take Out Trash', '$10', 'Too fat to get out of bed. Please take out my trash'),
    (3, 'Kill Cockroach', '$20', 'I will die if this thing lands on me');


COMMIT;