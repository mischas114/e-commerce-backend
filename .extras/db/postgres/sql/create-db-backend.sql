-- !! Die SQL Dateien müssen in Volumes auf dem Dateipfad übernommen werden (csv auch)

-- (1) user "postgres" in docker-compose.yaml auskommentieren,
--     damit der PostgreSQL-Server implizit mit dem Linux-User "root" gestartet wird
-- (2) PowerShell:
--     cd <Verzeichnis-mit-docker-compose.yaml>
--     docker compose up postgres
-- (3) 2. PowerShell:
--     cd <Verzeichnis-mit-docker-compose.yaml>
--     docker compose exec postgres bash
--         chown postgres:postgres /var/lib/postgresql/tablespace
--         chown postgres:postgres /var/lib/postgresql/tablespace/backend
--         exit
--     docker compose down
-- (3) in docker-compose.yaml den User "postgres" wieder aktivieren
-- (4) 1. PowerShell:
--     docker compose up
-- (5) 2. PowerShell:
--     docker compose exec postgres bash
--        psql --dbname=postgres --username=postgres --file=/sql/create-db-backend.sql
--        psql --dbname=backend --username=backend --file=/sql/create-schema-backend.sql
--        exit
--     docker compose down

CREATE ROLE backend LOGIN PASSWORD 'p';

CREATE DATABASE backend;

GRANT ALL ON DATABASE backend TO backend;

CREATE TABLESPACE backendspace OWNER backend LOCATION '/var/lib/postgresql/tablespace/e-commerce-backend';
