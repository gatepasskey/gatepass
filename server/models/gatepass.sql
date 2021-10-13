DROP TABLE IF EXISTS public.guests;
DROP TABLE IF EXISTS public.users;
CREATE TABLE public.users(
    "_id" varchar NOT NULL,
    "username" varchar NOT NULL,
    "password" varchar NOT NULL,
    "admin" boolean NOT NULL,
    "address" varchar,
    "phone_number" varchar,
    PRIMARY KEY ("_id")
);

CREATE TABLE public.guests(
    "_id" varchar NOT NULL,
    "first_name" varchar NOT NULL,
    "last_name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "phone_number" varchar NOT NULL,
    "license_number" varchar NOT NULL,
    "resident_id" varchar NOT NULL,
    PRIMARY KEY ("_id"),
    FOREIGN KEY ("resident_id") REFERENCES users("_id")
);

INSERT INTO users(_id, username, password, admin, address, phone_number) VALUES
('4c4f4dfe-f203-4d78-bef2-3df860747336', 'lina', 'lina', FALSE, '123 Hello Dr.', '(234)567-8910'),
('5555555f-ffdd-354t-dsf3-355555555555', 'charles', 'charles', FALSE, '150 Bye Dr.', '(248)235-7234'),
('63100c8a-94cf-4bd1-98a0-6f36b13d680a', 'admin', 'admin', TRUE, '', '')