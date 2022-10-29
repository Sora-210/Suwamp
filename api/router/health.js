//#########################################
const router = require('express').Router();
//#########################################
router.all('/', (req, res) => {
    res.status(200).json({
        'status': 'Sucsess',
        'message': 'API SERVER OK'
    })
})
//#########################################
module.exports = router;
