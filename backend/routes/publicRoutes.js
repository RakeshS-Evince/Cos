const express = require('express');
const { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require('../middleware/authSchema');
const { register, login, forgotPassword, resetPassword } = require('../controller/auth');
const { verifyAuth } = require('../middleware/auth');
const { getAllIceCreams, getOneIceCream, getIceCreamByBrand } = require('../controller/iceCream');
const { getAllBrands } = require('../controller/brands');
const { postMessages } = require('../controller/dashboard');
const publicRouter = express.Router();

// <---------------------------------------------public apis-------------------------------------->

// <-----------Authentication---------------->
publicRouter.post('/auth/register', registerSchema, register);
publicRouter.post('/auth/login', loginSchema, login);
publicRouter.post('/auth/forgot-password', forgotPasswordSchema, forgotPassword);
publicRouter.put('/auth/reset-password', resetPasswordSchema, verifyAuth, resetPassword);
// <-----------Ice-creams read only---------->
publicRouter.get('/ice-creams', getAllIceCreams);
publicRouter.get('/ice-creams/:id', getOneIceCream);
publicRouter.get('/ice-creams-by-brand/:name', getIceCreamByBrand);
// <-----------Brands read only-------------->
publicRouter.get('/brands', getAllBrands);
// <-----------Contact us message------------>
publicRouter.post('/messages', postMessages)

module.exports = publicRouter