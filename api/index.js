//#########################################
const PORT = 3333;
//#########################################
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//#########################################
const app = express();
app.use(bodyParser.json());
app.use(cors());
//#########################################
app.use('/health', require('./router/health'));
app.use('/login', require('./router/Login'));
app.use('/users', require('./router/Users'));
app.use('/stamps', require('./router/Stamps'));
app.use('/pushed', require('./router/pushed'));
//#########################################
app.all('*', (req, res) => {
    res.status(404).json({
        'status': 'Error',
        'message': 'Not Found'
    })
});
//#########################################
app.listen(PORT, () => {
    console.log('Server Start!');
    console.log('LISTEN PORT: ' + PORT);
})
