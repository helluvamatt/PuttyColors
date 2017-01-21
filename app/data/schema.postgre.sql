DROP INDEX IF EXISTS idx_profiles_parentid;
DROP INDEX IF EXISTS idx_profiles_id;
DROP TABLE IF EXISTS profiles;
DROP INDEX IF EXISTS idx_sessions_userid;
DROP INDEX IF EXISTS idx_sessions_id;
DROP TABLE IF EXISTS sessions;
DROP INDEX IF EXISTS idx_users_username;
DROP INDEX IF EXISTS idx_users_id;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	"_id" bigserial primary key,
	"id" VARCHAR(16) NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"firstName" VARCHAR(255) DEFAULT NULL,
	"lastName" VARCHAR(255) DEFAULT NULL,
	"role" smallint DEFAULT 1,
	"enabled" boolean DEFAULT TRUE
);

CREATE UNIQUE INDEX idx_users_id ON users ("id");
CREATE UNIQUE INDEX idx_users_username ON users ("name");

CREATE TABLE sessions (
	"_id" bigserial primary key,
	"id" VARCHAR(32) NOT NULL,
	"userId" VARCHAR(16) NOT NULL,
	"created" timestamp NOT NULL,
	"expires" timestamp NOT NULL
);

CREATE INDEX idx_sessions_userid ON sessions("userId");
CREATE UNIQUE INDEX idx_sessions_id ON sessions ("id");

CREATE TABLE profiles (
	"_id" bigserial primary key,
	"id" VARCHAR(16) NOT NULL,
	"parentId" VARCHAR(16) DEFAULT NULL,
	"owner" VARCHAR(16) NOT NULL,
	"name" VARCHAR(255) DEFAULT NULL,
	"author" VARCHAR(255) DEFAULT NULL,
	"url" VARCHAR(4096) DEFAULT NULL,
	"sessionName" VARCHAR(255) DEFAULT NULL,
	"type" int NOT NULL,
	"data" JSON NOT NULL,
	"created" TIMESTAMP DEFAULT now(),
	"enabled" boolean DEFAULT TRUE
);

CREATE INDEX idx_profiles_parentid ON profiles ("parentId");
CREATE UNIQUE INDEX idx_profiles_id ON profiles ("id");

-- These will not work due to the new obfuscated IDs scheme
--INSERT INTO users ("username", "password", "firstname", "lastname") VALUES ("puttycolors", "", "PuTTY", "Colors");
--INSERT INTO users ("username", "password", "firstname", "lastname") VALUES ("admin", "", "Admin", "Admin", 2);

--INSERT INTO profiles ("name", "owner", "author", "url", "sessionName", "type", "data") VALUES ('PuTTY Default', 1, 'Simon Tatham', 'http://www.chiark.greenend.org.uk/~sgtatham/putty/', 'Default Session', 0, '{"colour0":"rgb(184,184,184)","colour1":"rgb(255,255,255)","colour2":"rgb(0,0,0)","colour3":"rgb(0,0,0)","colour4":"rgb(0,0,0)","colour5":"rgb(0,255,0)","colour6":"rgb(0,0,0)","colour7":"rgb(63,63,63)","colour8":"rgb(184,0,0)","colour9":"rgb(255,0,0)","colour10":"rgb(0,184,0)","colour11":"rgb(0,255,0)","colour12":"rgb(184,184,0)","colour13":"rgb(255,255,0)","colour14":"rgb(0,0,184)","colour15":"rgb(0,0,255)","colour16":"rgb(184,0,184)","colour17":"rgb(255,0,255)","colour18":"rgb(0,184,184)","colour19":"rgb(0,255,255)","colour20":"rgb(184,184,184)","colour21":"rgb(255,255,255)"}');
--INSERT INTO profiles ("name", "owner", "author", "url", "sessionName", "type", "data") VALUES ('Solarized Dark', 1, 'Ethan Schoonover', 'https://github.com/altercation/solarized/tree/master/putty-colors-solarized', 'Default Session', 0, '{"colour0":"rgb(131,148,150)","colour1":"rgb(147,161,161)","colour2":"rgb(0,43,54)","colour3":"rgb(7,54,66)","colour4":"rgb(0,43,54)","colour5":"rgb(238,232,213)","colour6":"rgb(7,54,66)","colour7":"rgb(0,43,56)","colour8":"rgb(220,50,47)","colour9":"rgb(203,75,22)","colour10":"rgb(133,153,0)","colour11":"rgb(88,110,117)","colour12":"rgb(181,137,0)","colour13":"rgb(101,123,131)","colour14":"rgb(38,139,210)","colour15":"rgb(131,148,150)","colour16":"rgb(211,54,130)","colour17":"rgb(108,113,196)","colour18":"rgb(42,161,152)","colour19":"rgb(147,161,161)","colour20":"rgb(238,232,213)","colour21":"rgb(253,246,227)"}');
--INSERT INTO profiles ("name", "owner", "author", "url", "sessionName", "type", "data") VALUES ('Solarized Light', 1, 'Ethan Schoonover', 'https://github.com/altercation/solarized/tree/master/putty-colors-solarized', 'Default Session', 0, '{"colour0":"rgb(101,123,131)","colour1":"rgb(88,110,117)","colour2":"rgb(253,246,227)","colour3":"rgb(238,232,213)","colour4":"rgb(238,232,213)","colour5":"rgb(101,123,131)","colour6":"rgb(7,54,66)","colour7":"rgb(0,43,54)","colour8":"rgb(220,50,47)","colour9":"rgb(203,75,22)","colour10":"rgb(133,153,0)","colour11":"rgb(88,110,117)","colour12":"rgb(181,137,0)","colour13":"rgb(101,123,131)","colour14":"rgb(38,139,210)","colour15":"rgb(131,148,150)","colour16":"rgb(211,54,130)","colour17":"rgb(108,113,196)","colour18":"rgb(42,161,152)","colour19":"rgb(147,161,161)","colour20":"rgb(238,232,213)","colour21":"rgb(253,246,227)"}');
