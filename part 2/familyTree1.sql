-- Create FamilyTree database 
CREATE DATABASE FamilyTree;
USE FamilyTree;

-- Create the Person table to store individual details
CREATE TABLE Person (
    Person_Id VARCHAR(50) PRIMARY KEY,   
    First_Name VARCHAR(100),            
    Last_Name VARCHAR(100),           
    Gender CHAR(1),                     
    Father_Id VARCHAR(50),              
    Mother_Id VARCHAR(50),              
    Spouse_Id VARCHAR(50)                
);

-- Create the Family_Tree table to store relationships between persons
CREATE TABLE Family_Tree (
    Person_Id VARCHAR(50),      
    Relative_Id VARCHAR(50),    
    Connection_Type VARCHAR(50), 
    PRIMARY KEY (Person_Id, Relative_Id)  
);

-- Insert initial data into the Person table
INSERT INTO Person (First_Name, Last_Name, Gender, Person_Id, Father_Id, Mother_Id, Spouse_Id) 
VALUES ('Moshe', 'Runes', 'M', '212225465', '200001234', '039425698', '039471589'),
       ('Sara', 'Runes', 'F', '039471589', '054632563', '123456789', '212225465'),
       ('Dasi', 'Runes', 'F', '217589654', '212225465', '039471589', '123632563'),
       ('David', 'Runes', 'M', '323336536', '212225465', '039471589', '45632563');

-- Insert more data into the Person table
INSERT INTO Person (First_Name, Last_Name, Gender, Person_Id, Father_Id, Mother_Id, Spouse_Id) 
VALUES('Pini', 'Runes', 'M', '523659814', '212225465', '039471589', '15236958'),
      ('Shlomit', 'Cohen', 'F', '15236958', '123698547', '963258478', Null);

-- Insert father-child relationships into Family_Tree
INSERT INTO Family_Tree (Person_Id, Relative_Id, Connection_Type)
SELECT Person_Id, Father_Id, 'בן' 
FROM Person
WHERE Father_Id IS NOT NULL and Gender = 'M';

-- Insert mother-child relationships into Family_Tree
INSERT INTO Family_Tree (Person_Id, Relative_Id, Connection_Type)
SELECT Person_Id, Father_Id, 'בת' 
FROM Person
WHERE Father_Id IS NOT NULL and Gender = 'F';

-- Insert mother-child relationships into Family_Tree
INSERT INTO Family_Tree (Person_Id, Relative_Id, Connection_Type)
SELECT Person_Id, Mother_Id, 'בן' 
FROM Person
WHERE Mother_Id IS NOT NULL and Gender = 'M';

-- Insert mother-child relationships into Family_Tree
INSERT INTO Family_Tree (Person_Id, Relative_Id, Connection_Type)
SELECT Person_Id, Mother_Id, 'בת' 
FROM Person
WHERE Mother_Id IS NOT NULL and Gender = 'F';

-- Insert father-son relationships into Family_Tree
INSERT INTO Family_Tree (Person_Id, Relative_Id, Connection_Type)
SELECT  Father_Id,Person_Id, 'אב'
FROM Person
WHERE Father_Id IS NOT NULL;

-- Insert mother-son relationships into Family_Tree
INSERT INTO Family_Tree (Person_Id, Relative_Id, Connection_Type)
SELECT Mother_Id, Person_Id, 'אם'
FROM Person
WHERE Mother_Id IS NOT NULL;

-- Insert husband-wife relationships into Family_Tree (Avoid duplication)
INSERT INTO Family_Tree (Person_Id, Relative_Id, Connection_Type)
SELECT Person_Id, Spouse_Id, 'בן זוג'
FROM Person p1
WHERE Spouse_Id IS NOT NULL and Gender = 'M';

-- Insert husband-wife relationships into Family_Tree (Avoid duplication)
INSERT INTO Family_Tree (Person_Id, Relative_Id, Connection_Type)
SELECT Person_Id, Spouse_Id, 'בת זוג'
FROM Person p1
WHERE Spouse_Id IS NOT NULL and Gender = 'F';

-- Insert sibling relationships (Brother) into Family_Tree
INSERT INTO Family_Tree (Person_Id, Relative_Id, Connection_Type)
SELECT p1.Person_Id, p2.Person_Id, 'אח'
FROM Person p1
JOIN Person p2 ON (p1.Father_Id = p2.Father_Id OR p1.Mother_Id = p2.Mother_Id)
WHERE p1.Person_Id != p2.Person_Id  -- Ensure no self-link
  AND p1.Gender = 'M';

-- Insert sibling relationships (Sister) into Family_Tree
INSERT INTO Family_Tree (Person_Id, Relative_Id, Connection_Type)
SELECT p1.Person_Id, p2.Person_Id, 'אחות'
FROM Person p1
JOIN Person p2 ON (p1.Father_Id = p2.Father_Id OR p1.Mother_Id = p2.Mother_Id)
WHERE p1.Person_Id != p2.Person_Id  -- Ensure no self-link
  AND p1.Gender = 'F';

-- Example 2: Find people without a spouse and add the missing relationships

-- Step 1: Find people missing spouse relationships and insert "Spouse" relation
WITH MissingSpouse AS (
    SELECT p1.Person_Id AS P1, p1.Spouse_Id AS Spouse_Id
    FROM Person p1
    WHERE p1.Spouse_Id IS NOT NULL
    AND p1.Person_Id IS NOT NULL
    AND NOT EXISTS (  -- Check if reverse relationship exists
        SELECT 1
        FROM Family_Tree ft
        WHERE ft.Person_Id = p1.Spouse_Id
        AND ft.Relative_Id = p1.Person_Id
        AND ft.Connection_Type = 'בת זוג'
    )
)
-- Insert the missing "Spouse" relationship
INSERT INTO Family_Tree (Person_Id, Relative_Id, Connection_Type)
SELECT P1, Spouse_Id, 'בן זוג'
FROM MissingSpouse;

-- Step 2: Add the reverse "Spouse" relationship for the other side
WITH MissingSpouse2 AS (
    SELECT p1.Person_Id AS P1, p1.Spouse_Id AS Spouse_Id
    FROM Person p1
    WHERE p1.Spouse_Id IS NOT NULL
    AND p1.Person_Id IS NOT NULL
    AND NOT EXISTS (  -- Check if reverse relationship exists
        SELECT 1
        FROM Family_Tree ft
        WHERE ft.Person_Id = p1.Spouse_Id
        AND ft.Relative_Id = p1.Person_Id
        AND ft.Connection_Type = 'בן זוג'
    )
)
-- Insert the missing "Spouse" relationship as "wife"
INSERT INTO Family_Tree (Person_Id, Relative_Id, Connection_Type)
SELECT Spouse_Id, P1, 'בת זוג'
FROM MissingSpouse2;

-- Show all relationships in Family_Tree
SELECT * FROM Family_Tree;








