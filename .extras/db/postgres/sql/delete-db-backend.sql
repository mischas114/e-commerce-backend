-- Revoke privileges
REVOKE ALL ON DATABASE backend FROM backend;

-- Drop tables and schema
DROP SCHEMA IF EXISTS backend CASCADE;

-- Drop tablespace
DROP TABLESPACE IF EXISTS backendspace;

-- Drop database
DROP DATABASE IF EXISTS backend;

-- Drop role
DROP ROLE IF EXISTS backend;
