const express = require('express');
const { register, login } = require('./controller/auth');
const { getAllIceCreams, getOneIceCream, addIceCream, updateIceCream, deleteIceCream } = require('./controller/iceCream');
const { placeOrder, findOrder, findOneOrder, findAllOrders, updateOrderStatus } = require('./controller/order');
const { profile, updateProfile, getAllAddress, makeDefaultAddress, getDefaultAddress, editAddress, addAddress } = require('./controller/user');
const { verifyAuth } = require('./middleware/auth');
const { upload } = require('./middleware/multer');
const { getAllBrands, addBrands, updateBrands, deleteBrands } = require('./controller/brands');
const router = express.Router();
router.get('/home', (req, res) => res.send('home page'))
// Authentication
router.post('/auth/register', register);
router.post('/auth/login', login);
// Ice-creams CRUD
router.get('/ice-creams', getAllIceCreams);
router.get('/ice-creams/:id', getOneIceCream);
router.post('/ice-creams', upload.single('image'), addIceCream);
router.put('/ice-creams/:id', upload.single('image'), updateIceCream);
router.delete('/ice-creams/:id', deleteIceCream);
// Brands CRUD
router.get('/brands', getAllBrands);
router.post('/brands', upload.single('image'), addBrands);
router.put('/brands/:name', upload.single('image'), updateBrands);
router.delete('/brands/:name', deleteBrands);
//Orders
router.post('/order/place', verifyAuth, placeOrder);
router.get('/my-orders', verifyAuth, findOrder);
router.get('/order-details/:id', verifyAuth, findOneOrder);
router.get('/orders', verifyAuth, findAllOrders);
router.put('/order-status-update/:id', verifyAuth, updateOrderStatus);
// user details
router.get('/user/profile', verifyAuth, profile);
router.put('/user/profile', verifyAuth, updateProfile);
router.get('/user/address', verifyAuth, getAllAddress);
router.post('/user/address', verifyAuth, addAddress);
router.put('/user/address/:id', verifyAuth, editAddress);
router.put('/user/address-default/:id', verifyAuth, makeDefaultAddress);
router.get('/user/address-default/', verifyAuth, getDefaultAddress);

module.exports = router