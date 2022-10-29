//#########################################
const router = require('express').Router();
const db = require('../db');
//#########################################

router.post('/', (req, res) => {
    try {
        //BodyCheck
        if (!req.body['name']) throw new Error('BodyError:name');
        if (!req.body['location']) throw new Error('BodyError:location');

        //INSERT DB
        db.query(`INSERT INTO Stamps (Name, Location) VALUES ('${req.body['name']}', '${req.body['location']}');`, (err, rows) => {
            if (err) throw new Error("DBError: NotInsert");
            console.log(rows)
        })

    } catch(e) {
        console.log(e)
    }
    res.send('ok')
})

//#########################################
module.exports = router;
