DROP INDEX IF EXISTS idx_profiles_parentId;
DROP TABLE IF EXISTS profiles;
CREATE TABLE profiles ("_id" bigint primary key, "id" varchar(8) unique not null, "parentId" varchar(8) DEFAULT NULL, "name" VARCHAR(255), "author" VARCHAR(255), "sessionName" VARCHAR(255), "type" VARCHAR(16), "data" JSON, "created" TIMESTAMP DEFAULT now());
CREATE INDEX idx_profiles_parentId ON profiles ("parentId");
