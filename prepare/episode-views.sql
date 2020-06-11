DROP TABLE IF EXISTS public.episode_views;

CREATE TABLE public.episode_views (
    id integer NOT NULL,
    season_id integer,
    episode_in_season_id integer,
    views real
);

\COPY public.episode_views FROM './episode-views.csv' DELIMITER ',' CSV HEADER