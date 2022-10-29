//#########################################
const router = require('express').Router();
const db = require('../db');
const createQuery = require('../func/createQuery')
//#########################################

router.get('/list', (req, res) => {
    try {
        //Check unique Stamp Name
        db.query(createQuery(
            'SELECT * FROM Stamps ;'
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


router.post('/', (req, res) => {
    try {
        //BodyCheck
        if (!req.body['name']) throw new Error('BodyError:name');
        if (!req.body['location']) throw new Error('BodyError:location');

        //Check unique Stamp Name
        db.query(createQuery(
            'SELECT COUNT(*) AS n FROM Stamps ',
            `WHERE Name = "${req.body['name']}";`
        ), (err, rows) => {
            if (err) throw err;

            if (rows[0].n === 0) {
                //INSERT DB
                db.query(createQuery(
                    'INSERT INTO Stamps (Name, Location)',
                    `VALUES ('${req.body['name']}', '${req.body['location']}');`
                ), (err, rows) => {
                    if (err) throw err;

                    db.query(createQuery(
                        'SELECT * FROM Stamps ',
                        `WHERE id = ${rows.insertId};`
                    ), (err, rows) => {
                        if (err) throw err;

                        res.status(201).json(rows);
                    })
                })
            } else {
                res.status(403).json({
                    "status": "Error",
                    "message": "This Stamp's name was already registered"
                })
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
