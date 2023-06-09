const express = require('express');
const { verifyAuth } = require('../middleware/auth');
const { profile, updateProfile, getAllAddress, getOneAddress, deleteOneAddress, addAddress, editAddress, makeDefaultAddress, getDefaultAddress } = require('../controller/user');
const { getCustomerReview, addRating } = require('../controller/reviews');
const { placeOrder, findOrder, findOneOrder, orderCallback, retryPayment } = require('../controller/order');
const { profileUpdateSchema } = require('../middleware/userSchema');
const userRouter = express.Router();
userRouter.use(verifyAuth);
// <---------------user details-------------->
userRouter.get('/profile', profile);
userRouter.put('/profile', profileUpdateSchema, updateProfile);
userRouter.get('/address', getAllAddress);
userRouter.get('/address/:id', getOneAddress);
userRouter.delete('/address/:id', deleteOneAddress);
userRouter.post('/address', addAddress);
userRouter.put('/address/:id', editAddress);
userRouter.put('/address-default/:id', makeDefaultAddress);
userRouter.get('/address-default/', getDefaultAddress);
userRouter.get('/reviews/', getCustomerReview);
userRouter.put('/reviews/', addRating);

// <----------------user order------------------>
userRouter.post('/order/place', placeOrder);
userRouter.get('/my-orders', findOrder);
userRouter.get('/order-details/:id', findOneOrder);
// <--------------user order payment------------------>
userRouter.post('/api/razorpay/callback/:orderId', orderCallback)
userRouter.post('/api/razorpay/retry-callback/', retryPayment)

module.exports = userRouter