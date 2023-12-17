-- drop table
DROP TABLE IF EXISTS "todos";

-- create table
CREATE TABLE "todos" (
"id" SERIAL PRIMARY KEY,
"text" TEXT,
"isComplete" BOOL DEFAULT FALSE
);


INSERT INTO "todos"
  ("text")
  VALUES 
  ('Build a CRUD app'),
  ('Make my app look nice');

-- Get all data
SELECT * FROM "todos";

-- Create a todo
INSERT INTO "todos"
  ("text")
  VALUES
  ($1);

-- Example INSERT query
INSERT INTO "todos"
  ("text")
  VALUES
  ('This is a brand new todo');

-- Toggle isComplete Boolean with Update query
UPDATE "todos" SET "isComplete" = Not "isComplete" 
WHERE "id" = $1;

-- Example UPDATE query
UPDATE "todos" SET "isComplete" = Not "isComplete" 
WHERE "id" = 2;

-- Delete table entry by id
DELETE FROM "todos"
WHERE "id" = $1;

-- Example DELETE query
DELETE FROM "todos"
WHERE "id" = 2;

