const express = require('express');
const { register, login } = require('./controller/auth');
const { getAllIceCreams, getOneIceCream, addIceCream, updateIceCream, saveCart } = require('./controller/iceCream');
const { placeOrder } = require('./controller/order');
const { profile, updateProfile, getAllAddress, makeDefaultAddress, getDefaultAddress, editAddress, addAddress } = require('./controller/user');
const { verifyAuth } = require('./middleware/auth');
const router = express.Router();
router.get('/home', (req, res) => res.send('home page'))
router.post('/auth/register', register)
router.post('/auth/login', login)
router.get('/ice-creams', getAllIceCreams);
router.get('/ice-creams/:id', getOneIceCream);
router.post('/ice-creams', addIceCream);
router.put('/ice-creams/:id', updateIceCream);
router.post('/cart/', saveCart);
router.post('/order/place', placeOrder);
router.get('/user/profile', verifyAuth, profile);
router.put('/user/profile', verifyAuth, updateProfile);
router.get('/user/address', verifyAuth, getAllAddress);
router.post('/user/address', verifyAuth, addAddress);
router.put('/user/address/:id', verifyAuth, editAddress);
router.put('/user/address-default/:id', verifyAuth, makeDefaultAddress);
router.get('/user/address-default/', verifyAuth, getDefaultAddress);
module.exports = router