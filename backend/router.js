const express = require('express');
const { signup, login } = require('./controller/auth');
const { getAllIceCreams, getOneIceCream, addIceCream, updateIceCream } = require('./controller/iceCream');
const router = express.Router();
router.get('/home', (req, res) => res.send('home page'))
router.post('/auth/signup', signup)
router.post('/auth/login', login)
router.get('/ice-creams', getAllIceCreams);
router.get('/ice-creams/:id', getOneIceCream);
router.post('/ice-creams', addIceCream);
router.put('/ice-creams/:id', updateIceCream);
module.exports = router