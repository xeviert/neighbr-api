BEGIN;

TRUNCATE "user";
INSERT INTO "user"    ("first_name", "last_name", "email", "password", "address")
VALUES
    ('Alanis', 'Hand', 'Adriel44@gmail.com', '$2a$12$jqMHBp1IoIY9/NZvI.KnxudFRxoBY.GoNT/sG2IalkVtULjBwN1HW', '982 Dietrich Extension'),
    ('Lindsay', 'Schowalter', 'Britney.Luettgen@gmail.com', '$2a$12$jqMHBp1IoIY9/NZvI.KnxudFRxoBY.GoNT/sG2IalkVtULjBwN1HW', '60886 Goldner Lodge'),
    ('Cornelius', 'Zemlak', 'Adan57@yahoo.com', '$2a$12$jqMHBp1IoIY9/NZvI.KnxudFRxoBY.GoNT/sG2IalkVtULjBwN1HW', '806 Joe Harbors'),
    ('Rahsaan', 'Wintheiser', 'Abagail_Vandervort52@yahoo.com', '$2a$12$jqMHBp1IoIY9/NZvI.KnxudFRxoBY.GoNT/sG2IalkVtULjBwN1HW', '1598 Hagenes Flats'),
    ('Moises', 'Brakus', 'Terence.Ebert25@gmail.com', '$2a$12$jqMHBp1IoIY9/NZvI.KnxudFRxoBY.GoNT/sG2IalkVtULjBwN1HW', '1827 Bruen Place'),
    ('Nelda', 'Bradtke', 'Clyde56@gmail.com', '$2a$12$jqMHBp1IoIY9/NZvI.KnxudFRxoBY.GoNT/sG2IalkVtULjBwN1HW', '969 Predovic Ridge'),
    ('Marcel', 'Bauch', 'Cynthia_Brekke@gmail.com', '$2a$12$jqMHBp1IoIY9/NZvI.KnxudFRxoBY.GoNT/sG2IalkVtULjBwN1HW', '501 Hermann Tunnel');


COMMIT;