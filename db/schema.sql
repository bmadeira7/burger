DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;

USE burgers_db;

-- Create the table plans.
CREATE TABLE burgers;
(
id INT NOT NULL AUTO_INCREMENT,
burger_name VARCHAR(255) NOT NULL,
devoured BOOLEAN,
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO plans (plan) VALUES ('Plan to fight a ninja.');
