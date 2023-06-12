const express = require('express');
const { verifyAuth } = require('../middleware/auth');
const { profile,
    updateProfile,
    getAllAddress,
    getOneAddress,
    deleteOneAddress,
    addAddress,
    editAddress,
    makeDefaultAddress,
    getDefaultAddress,
    getCustomerReview,
    postReview,
    placeOrder,
    findMyOrders,
    findOneOrder,
    verifyPayment,
    retryPayment,
    cancelOrder } = require('../controller/userController');
const { profileUpdateSchema } = require('../middleware/userSchema');
// const { placeOrder } = require('../controller/order');
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
userRouter.get('/reviews/:iid', getCustomerReview);
userRouter.post('/reviews/:iid', postReview);

// <----------------user order------------------>
userRouter.post('/order/place', placeOrder);
userRouter.put("/order-cancel/:id", cancelOrder)
userRouter.get('/my-orders', findMyOrders);
userRouter.get('/my-order-details/:id', findOneOrder);
// <--------------user order payment------------------>

module.exports = userRouter