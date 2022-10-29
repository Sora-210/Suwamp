//#########################################
const router = require('express').Router();
const db = require('../db');
const createQuery = require('../func/createQuery');
const crypto = require('crypto');
//#########################################

router.post('/', async (req, res) => {
    try {
        //BodyCheck
        if (!req.body['name']) throw new Error('BodyError:name');
        if (!req.body['password']) throw new Error('BodyError:password');

        //Check Unique UserName
        db.query(createQuery(
            'SELECT COUNT(*) AS n FROM Users ',
            `WHERE Name = "${req.body['name']}";`
        ), (err, rows) => {
            if (err) throw err;
            if (rows[0].n === 0) {
                //Hash
                const passHash = crypto.createHash('sha256').update(Buffer.from(req.body['password'])).digest('hex');
                //LoginHash
                const loginHash = crypto.createHash('sha256').update(Buffer.from(req.body['name'] + Math.random().toString(32).substring(2) + (new Date()).toString())).digest('hex');

                //Insert DB
                db.query(createQuery(
                    'INSERT INTO Users(Name, Password, LoginHash) VALUES ',
                    `("${req.body['name']}", "${passHash}", "${loginHash}");`
                ), (err, rows) => {
                    if (err) throw err;
                    
                    db.query(`SELECT * FROM Users WHERE id = ${rows.insertId}`, (err, rows) => {
                        res.status(201).json(rows);
                    })
                });
            } else {
                res.status(403).json({
                    'status': 'Error',
                    'message': 'This UserName was Already Recorded'
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
