const express = require('express');
const { signup, login } = require('./controller/auth');
const { getAllIceCreams, getOneIceCream, addIceCream, updateIceCream, saveCart } = require('./controller/iceCream');
const { placeOrder } = require('./controller/order');
const router = express.Router();
router.get('/home', (req, res) => res.send('home page'))
router.post('/auth/signup', signup)
router.post('/auth/login', login)
router.get('/ice-creams', getAllIceCreams);
router.get('/ice-creams/:id', getOneIceCream);
router.post('/ice-creams', addIceCream);
router.put('/ice-creams/:id', updateIceCream);
router.post('/cart/', saveCart);
router.post('/order/place', placeOrder);
module.exports = router