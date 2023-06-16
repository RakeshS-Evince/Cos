require('dotenv').config()
const express = require('express');
const path = require('path')
const passport = require("passport");
const session = require("express-session")
require("./middleware/passportGoogle");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const { CheckErrorType, apiError } = require('./utils/errorValidator');
const publicRouter = require('./routes/publicRoutes');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'session secret'
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use("/states", express.static(path.join(__dirname, "./model", './state_city.json')));
app.use("/images", express.static(path.join(__dirname, "./resources", './images')));
app.use("/", publicRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use(CheckErrorType);
app.use(apiError);

app.listen(process.env.PORT, () => console.log('Server is listening at port ' + process.env.PORT))