DROP DATABASE IF EXISTS Register_Users;
CREATE DATABASE Register_Users
USE Register_Users;



CREATE TABLE IF NOT EXISTS public.users
(
    id_usr integer NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    ema_usr character varying(50) COLLATE pg_catalog."default" NOT NULL,
    niv_acc text COLLATE pg_catalog."default" NOT NULL DEFAULT 'user'::text,
    pass_usr character varying(256) COLLATE pg_catalog."default" NOT NULL,
    nam_usr text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id_usr)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

--Configurar el usuario y contraseña de postgres dentro del arquivo de .env de server/auch