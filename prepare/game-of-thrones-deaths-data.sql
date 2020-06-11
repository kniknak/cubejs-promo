DROP TABLE IF EXISTS public.deaths;

CREATE TABLE public.deaths (
    id integer NOT NULL,
    season_id integer,
    episode_in_season_id integer,
    character_killed varchar(300),
    killer varchar(300),
    method varchar(300),
    method_cat varchar(300),
    reason varchar(300),
    location varchar(300),
    allegiance varchar(300),
    importance integer
);

\COPY public.deaths FROM './game-of-thrones-deaths-data.csv' DELIMITER ',' CSV HEADER