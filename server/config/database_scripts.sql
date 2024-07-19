CREATE DATABASE AuthUser_db;
USE AuthUser_db;
CREATE TABLE Users (
    Id INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(255), 
    Email VARCHAR(255) NOT NULL unique, 
    Password VARCHAR(255), 
    Tokens VARCHAR(255),
    PRIMARY KEY (ID)
);

SELECT * FROM Users;
INSERT INTO Users (Name, Email, Password, Tokens)
VALUES ('Admin', 'admin@gmail.com', 'admin', '');