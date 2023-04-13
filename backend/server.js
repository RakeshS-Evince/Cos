require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);


app
    .get('/', (req, res) => { res.send('Server is running') })
    .listen(process.env.PORT, () => console.log('Server is listening at port ' + process.env.PORT))