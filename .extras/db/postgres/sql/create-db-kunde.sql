//TODO zum erstellen nutzen sql datei löschen 

-- (1) user "postgres" in docker-compose.yaml auskommentieren,
--     damit der PostgreSQL-Server implizit mit dem Linux-User "root" gestartet wird
-- (2) PowerShell:
--     cd <Verzeichnis-mit-docker-compose.yaml>
--     docker compose up postgres
-- (3) 2. PowerShell:
--     cd <Verzeichnis-mit-docker-compose.yaml>
--     docker compose exec postgres bash
--         chown postgres:postgres /var/lib/postgresql/tablespace
--         chown postgres:postgres /var/lib/postgresql/tablespace/kunde
--         exit
--     docker compose down
-- (3) in docker-compose.yaml den User "postgres" wieder aktivieren, d.h. Kommentar entfernen
-- (4) 1. PowerShell:
--     docker compose up
-- (5) 2. PowerShell:
--     docker compose exec postgres bash
--        psql --dbname=postgres --username=postgres --file=/sql/create-db-kunde.sql
--        psql --dbname=kunde --username=kunde --file=/sql/create-schema-kunde.sql
--        exit
--     docker compose down

CREATE ROLE kunde LOGIN PASSWORD 'p';

CREATE DATABASE kunde;

GRANT ALL ON DATABASE kunde TO kunde;

CREATE TABLESPACE kundespace OWNER kunde LOCATION '/var/lib/postgresql/tablespace/kunde';
