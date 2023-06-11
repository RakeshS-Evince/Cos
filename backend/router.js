require('dotenv').config()
const express = require('express');
const router = express.Router();
const { register,
    login,
    forgotPassword,
    resetPassword } = require('./controller/auth');
const { getAllIceCreams,
    getOneIceCream,
    addIceCream,
    updateIceCream,
    deleteIceCream,
    getIceCreamByBrand } = require('./controller/iceCream');
const { placeOrder,
    findOrder,
    findOneOrder,
    findAllOrders,
    updateOrderStatus,
    findAllOrdersByCustomerId,
    orderCallback,
    retryPayment } = require('./controller/order');
const { profile,
    updateProfile,
    getAllAddress,
    makeDefaultAddress,
    getDefaultAddress,
    editAddress,
    addAddress,
    getOneAddress,
    deleteOneAddress } = require('./controller/userController');
const { verifyAuth } = require('./middleware/auth');
const { upload } = require('./middleware/multer');
const { getAllBrands, addBrands, updateBrands, deleteBrands } = require('./controller/brands');
const { dashboardDetails, getAllMessages, postMessages } = require('./controller/dashboard');
const { getAllCustomers } = require('./controller/customers');
const { getCustomerReview, addRating, getAllReviews, getAllReviewsById } = require('./controller/reviews');
const { addStaff, findAllStaffs, updateStaff, deleteStaff, findOneStaff } = require('./controller/staff');
const { isAdmin, isAdminOrStaff } = require('./middleware/authorizeUser');
const { registerSchema, loginSchema, forgotPasswordSchema } = require('./middleware/authSchema');
router.get('/home', (req, res) => res.send('home page'));

// <---------------------------------------------public apis-------------------------------------->

// <-----------Authentication---------------->
router.post('/auth/register', registerSchema, register);
router.post('/auth/login', loginSchema, login);
router.post('/auth/forgot-password', forgotPasswordSchema, forgotPassword);
// <-----------Ice-creams read only---------->
router.get('/ice-creams', getAllIceCreams);
router.get('/ice-creams/:id', getOneIceCream);
router.get('/ice-creams-by-brand/:name', getIceCreamByBrand);
// <-----------Brands read only-------------->
router.get('/brands', getAllBrands);
// <-----------Contact us message------------>
router.post('/messages', postMessages)

// <------------------------------------------api that need authentication------------------------->

router.use(verifyAuth);

// <---------------user details-------------->
router.get('/user/profile', profile);
router.put('/user/profile', updateProfile);
router.get('/user/address', getAllAddress);
router.get('/user/address/:id', getOneAddress);
router.delete('/user/address/:id', deleteOneAddress);
router.post('/user/address', addAddress);
router.put('/user/address/:id', editAddress);
router.put('/user/address-default/:id', makeDefaultAddress);
router.get('/user/address-default/', getDefaultAddress);
router.get('/user/reviews/', getCustomerReview);
router.put('/user/reviews/', addRating);
router.put('/auth/reset-password', resetPassword);

// <----------------user order------------------>
router.post('/order/place', placeOrder);
router.get('/my-orders', findOrder);
router.get('/order-details/:id', findOneOrder);
// <----------------user order payment------------------>
router.post('/api/razorpay/callback/:orderId', orderCallback)
router.post('/api/razorpay/retry-callback/', retryPayment)


// <--------------------------------------------admin only routes----------------------------------->
router.post('/staff', isAdmin, addStaff)
router.get('/staff', isAdmin, findAllStaffs)
router.get('/staff/:id', isAdmin, findOneStaff)
router.put('/staff/:id', isAdmin, updateStaff)
router.delete('/staff/:id', isAdmin, deleteStaff)
//<------------------customers------------------->
router.get('/customers', getAllCustomers);
//<------------------reviews--------------------->
router.get('/reviews', getAllReviews);
router.get('/user-reviews/:id', getAllReviewsById);

// <--------------------------------------------admin/staff only routes------------------------------>
router.use(isAdminOrStaff);
// <---------------ice-cream crud--------------->
router.post('/ice-creams', upload.single('image'), addIceCream);
router.put('/ice-creams/:id', upload.single('image'), updateIceCream);
router.delete('/ice-creams/:id', deleteIceCream);
// <----------------Brands CRUD----------------->
router.post('/brands', upload.single('image'), addBrands);
router.put('/brands/:name', upload.single('image'), updateBrands);
router.delete('/brands/:name', deleteBrands);
// <----------------contact us messages--------->
router.get('/messages', getAllMessages)
// <----------------------Orders---------------->
router.get('/orders', findAllOrders);
router.put('/order-status-update/:id', updateOrderStatus);
router.get('/orders/:cid', findAllOrdersByCustomerId);
// <-------------------dashboard----------------->
router.get('/dashboard', dashboardDetails);
//admin-only routes

// router.post('/api/razorpay/create-order', initiatePayment)
module.exports = router