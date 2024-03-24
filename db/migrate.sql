
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    name VARCHAR(60),
    birthday DATETIME,
    UNIQUE(email)
);

DROP TABLE IF EXISTS loggedOn;
CREATE TABLE IF NOT EXISTS loggedOn (
    idNr INTEGER PRIMARY KEY AUTOINCREMENT,
    time CURRENT_TIMESTAMP,
    email VARCHAR(255),
    UNIQUE(email),
    CONSTRAINT onlyUsers
        FOREIGN KEY(email) 
        REFERENCES users(email)
);

-- DROP TABLE IF EXISTS reports;
-- CREATE TABLE IF NOT EXISTS reports (
--     idNr INTEGER PRIMARY KEY AUTOINCREMENT,
--     time CURRENT_TIMESTAMP,
--     data VARCHAR(1500),
--     title VARCHAR(255) NOT NULL,
--     UNIQUE(title)
-- );