const mysql = require('mysql');
const createQuery = require('../func/createQuery')
const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: process.env.MARIADB_ROOT_PASSWORD,
    database: process.env.MARIADB_DATABASE
});
//#########################################
//Check Connection
db.connect(function(err) {
    if (err) throw err;

    console.log("Database Connected!.");

    console.log("Table Check.");
    try {
        db.query('SHOW TABLES LIKE "Stamps";', (err, rows) => {
            if (err) throw err;
            if (rows.length === 0) {
                const query = createQuery(
                    `CREATE TABLE Stamps (`,
                    `id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,`,
                    `uuid VARCHAR(64) DEFAULT UUID() NOT NULL,`,
                    `Name VARCHAR(32) NOT NULL,`,
                    `Location VARCHAR(32) NOT NULL,`,
                    `isAvailable BOOL DEFAULT TRUE NOT NULL,`,
                    `atCreated DATETIME DEFAULT now() NOT NULL,`,
                    `index(id))`
                );
                db.query(query, (err, rows) => {
                    if (err) throw err;
                    console.log("Create Table 'Stamps'.");
                })
            }
        })

        db.query('SHOW TABLES LIKE "Users";', (err, rows) => {
            if (err) throw err;
            if (rows.length === 0) {
                const query = createQuery(
                    `CREATE TABLE Users (`,
                    `id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,`,
                    `Name VARCHAR(32) NOT NULL,`,
                    `Password VARCHAR(64) NOT NULL,`,
                    `LoginHash VARCHAR(64) DEFAULT NULL,`,
                    `atCreated DATETIME DEFAULT now() NOT NULL,`,
                    `index(id))`
                );
                db.query(query, (err, rows) => {
                    if (err) throw err;
                    console.log("Create Table 'Users'.");
                })
            }
        })

        db.query('SHOW TABLES LIKE "Pushed";', (err, rows) => {
            if (err) throw err;
            if (rows.length === 0) {
                const query = createQuery(
                    `CREATE TABLE Pushed (`,
                    `id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,`,
                    `userId INTEGER NOT NULL,`,
                    `stampId INTEGER NOT NULL,`,
                    `atCreated DATETIME DEFAULT now() NOT NULL,`,
                    `FOREIGN KEY (userId) REFERENCES Users(id),`,
                    `FOREIGN KEY (stampId) REFERENCES Stamps(id),`,
                    `index(id))`
                );
                db.query(query, (err, rows) => {
                    if (err) throw err;
                    console.log("Create Table 'Pushed'.");
                })
            }
        })
    } catch (e) {
        console.log(e);
    } 
})
//#########################################
//Export
module.exports = db;