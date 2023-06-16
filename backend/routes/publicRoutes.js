const express = require('express');
const { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require('../middleware/validationSchema');
const { register, login, forgotPassword, resetPassword } = require('../controller/authController');
const { verifyAuth } = require('../middleware/auth');
const { getAllIceCreams,
    getOneIceCream,
    getIceCreamByBrand,
    getAllBrands,
    postMessages,
    getAllReviews } = require('../controller/publicController');
const { verifyPayment, retryPayment } = require('../controller/userController');
const publicRouter = express.Router();
const passport = require("passport");
const { isAuthenticated } = require('../middleware/authorizeUser');
// <---------------------------------------------public apis-------------------------------------->

// <-----------Authentication---------------->
publicRouter.post('/auth/register', registerSchema, register);
publicRouter.post('/auth/login', loginSchema, login);
publicRouter.post('/auth/forgot-password', forgotPasswordSchema, forgotPassword);
publicRouter.put('/auth/reset-password', resetPasswordSchema, verifyAuth, resetPassword);
// <-----------Google authentication---------->
publicRouter.get("/auth/test", isAuthenticated, (req, res) => { res.send(req.user) })
publicRouter.get("/auth/login/google", passport.authenticate('google', { scope: ['profile', "email"] }));
publicRouter.get("/auth/google/callback/", passport.authenticate('google',
    {
        failureRedirect: process.env.URL + '/login',
        successRedirect: process.env.URL + "#/login-success"
    }),
    function (req, res) {
        res.send(req.user);
    });
publicRouter.get("/auth/logout", (req, res) => {
    req.session.destroy();
    res.send({ message: "Logged out" })
})
// <-----------Ice-creams read only---------->
publicRouter.get('/ice-creams', getAllIceCreams);
publicRouter.get('/ice-creams/:id', getOneIceCream);
publicRouter.get('/ice-creams-by-brand/:name', getIceCreamByBrand);
// <-----------Brands read only-------------->
publicRouter.get('/brands', getAllBrands);
// <-----------Contact us message------------>
publicRouter.post('/messages', postMessages)
// <-----------reviews------------>
publicRouter.get("/user-reviews/:id", getAllReviews);

publicRouter.post('/verify-payment/:orderId', verifyPayment)
publicRouter.post('/retry-payment/:orderId', retryPayment);

module.exports = publicRouter