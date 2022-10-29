//#########################################
const router = require('express').Router();
const db = require('../db');
const createQuery = require('../func/createQuery')
//#########################################

router.get('/list', (req, res) => {
    try {
        //BodyCheck
        if (!req.headers['auth']) throw new Error('BodyError:auth');

        db.query(createQuery(
            'SELECT * FROM Pushed INNER JOIN Stamps ON Pushed.stampId = Stamps.id ',
            `WHERE Pushed.userId = (SELECT id FROM Users WHERE LoginHash = "${req.headers['auth']}" LIMIT 1);`
        ), (err, rows) => {
            if (err) throw err;
            res.status(200).json(rows);
        })
    } catch(e) {
        res.status(500).json({
            'status': 'Error',
            'message': 'Undefined Server Error. Please Contact to suwageeks.org'
        })
    }
})

router.post('/:stampId', (req, res) => {
    try {
        //BodyCheck
        if (!req.headers['auth']) throw new Error('BodyError:auth');

        //Check Stamp
        db.query(createQuery(
            'SELECT id, Name FROM Stamps ',
            `WHERE uuid = "${req.params.stampId}" `,
            'LIMIT 1;'
        ), (err, rows) => {
            if (err) throw err;
            if (rows.length === 1) {
                const name = rows[0].Name
                //Check Pushed
                db.query(createQuery(
                    'SELECT COUNT(*) AS n FROM Pushed ',
                    'INNER JOIN Users ON Pushed.userId = Users.id ',
                    `WHERE LoginHash = "${req.headers['auth']}"`,
                    `AND Pushed.stampId = (SELECT id FROM Stamps WHERE uuid = "${req.params.stampId}");`
                ), (err, rows) => {
                    if (err) throw err;
                    if (rows[0].n === 0) {
                        //INSERT Push
                        db.query(createQuery(
                            'INSERT INTO Pushed(userId, stampId) VALUES (',
                            `(SELECT id FROM Users WHERE LoginHash = "${req.headers['auth']}" LIMIT 1),`,
                            `(SELECT id FROM Stamps WHERE uuid = "${req.params.stampId}"));`
                        ), (err, rows) => {
                            if (err) throw err;
                            res.status(201).json({
                                "status": "Success",
                                "message": "This Stamp was Pushed!",
                                "Name": name
                            })
                        })
                    } else {
                        res.status(409).json({
                            "status": "Error",
                            "message": "This Stamp was already Pushed"
                        })
                    }
                })
            } else {
                res.status(404).json({
                    "status": "Error",
                    "message": "Not Found"
                });
            }
        })
    } catch(e) {
        res.status(500).json({
            'status': 'Error',
            'message': 'Undefined Server Error. Please Contact to suwageeks.org'
        })
    }
})

//#########################################
module.exports = router;
