DROP TABLE IF EXISTS public.residents;
CREATE TABLE public.residents (
    "_id"  varchar NOT NULL,
    "username" varchar NOT NULL,
    "password" varchar NOT NULL,
    PRIMARY KEY ("_id")
);

DROP TABLE IF EXISTS public.guests;
CREATE TABLE public.guests (
    "_id" varchar NOT NULL,
    "resident_id" varchar NOT NULL,
    PRIMARY KEY ("_id")
);

INSERT INTO residents (_id, username, password ) VALUES
('1', 'resident1',  'resident1'),
('2', 'resident2', 'resident2'),