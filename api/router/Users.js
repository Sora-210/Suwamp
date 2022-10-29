//#########################################
const router = require('express').Router();
const db = require('../db');
const crypto = require('crypto')
//#########################################

router.post('/', async (req, res) => {
    try {
        //Error
        let error = null
        //BodyCheck
        if (!req.body['name']) throw new Error('BodyError:name');
        if (!req.body['password']) throw new Error('BodyError:password');

        //Check Unique UserName
        db.query(`SELECT COUNT(*) AS n FROM Users WHERE Name = "${req.body['name']}";`, (err, rows) => {
            try {
                if (err) throw new Error("DBError: NotSelect");
                if (rows[0].n !== 0) throw new Error('uniqueError:Name');

                //Hash
                const passHash = crypto.createHash('sha256').update(Buffer.from(req.body['password'])).digest('hex');

                //Insert DB
                db.query(`INSERT INTO Users(Name, Password) VALUES ("${req.body['name']}", "${passHash}");`, (err, rows) => {
                    if (err) throw err;
                    
                    db.query(`SELECT * FROM Users WHERE id = ${rows.insertId}`, (err, rows) => {
                        res.status(201).json(rows);
                    })
                });
            } catch(e) {
                if (e.message.split(':')[0] === "uniqueError") {
                    res.status(401).json({
                        'status': 'Error',
                        'message': 'This UserName was Already Recorded'
                    })
                } else {
                    res.status(500).json({
                        'status': 'Error',
                        'message': 'Undefined Server Error. Please Contact to suwageeks.org'
                    })
                }
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
