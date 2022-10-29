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
                    `id VARCHAR(64) DEFAULT UUID() NOT NULL PRIMARY KEY,`,
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
                    `atCreated DATETIME DEFAULT now() NOT NULL,`,
                    `index(id))`
                );
                db.query(query, (err, rows) => {
                    if (err) throw err;
                    console.log("Create Table 'Users'.");
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