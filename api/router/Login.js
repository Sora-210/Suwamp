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
        //Hash
        const passHash = crypto.createHash('sha256').update(Buffer.from(req.body['password'])).digest('hex');

        //Check Unique UserName
        db.query(`SELECT COUNT(*) AS n FROM Users WHERE Name = "${req.body['name']}" AND Password = "${passHash}";`, (err, rows) => {
            if (err) throw err;
            if (rows[0].n === 1) {
                res.status(200).json({
                    "status": "success",
                    "message": "Login"
                })
            } else {
                res.status(403).json({
                    "status": "Error",
                    "message": "can't Login"
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
