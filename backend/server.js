require('dotenv').config()
const express = require('express');
const path = require('path')
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const router = require('./router');
app.use(bodyParser.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use("/states", express.static(path.join(__dirname, "./model", './state_city.json')));
app.use("/images", express.static(path.join(__dirname, "./resources", './images')));

app
    .get('/', (req, res) => { res.send('Server is running') })
    .listen(process.env.PORT, () => console.log('Server is listening at port ' + process.env.PORT))