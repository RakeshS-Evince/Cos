const express = require('express');
const { addStaff, findAllStaffs, findOneStaff, updateStaff, deleteStaff } = require('../controller/staff');
const { getAllCustomers } = require('../controller/customers');
const { verifyAuth } = require('../middleware/auth');
const { isAdminOrStaff } = require('../middleware/authorizeUser');
const { upload } = require("../middleware/multer");
const { findAllMessages, addIceCream, updateIceCream, deleteIceCream, addBrands, updateBrands, deleteBrands, updateOrderStatus, findAllOrdersByCustomerId, dashboardDetails, findAllOrders, getAllReviews, getAllReviewsById } = require('../controller/adminController');
const adminRouter = express.Router();
adminRouter.use(verifyAuth);
adminRouter.use(isAdminOrStaff)
adminRouter.post('/staff', addStaff)
adminRouter.get('/staff', findAllStaffs)
adminRouter.get('/staff/:id', findOneStaff)
adminRouter.put('/staff/:id', updateStaff)
adminRouter.delete('/staff/:id', deleteStaff)
// --------------- customers------------------->
adminRouter.get('/customers', getAllCustomers);
// --------------- reviews--------------------->
adminRouter.get('/reviews', getAllReviews);
adminRouter.get('/user-reviews/:id', getAllReviewsById);

// <--------------------------------------------admin/staff only routes------------------------------>
// <---------------ice-cream crud--------------->
adminRouter.post('/ice-creams', upload.single('image'), addIceCream);
adminRouter.put('/ice-creams/:id', upload.single('image'), updateIceCream);
adminRouter.delete('/ice-creams/:id', deleteIceCream);
// <----------------Brands CRUD----------------->
adminRouter.post('/brands', upload.single('image'), addBrands);
adminRouter.put('/brands/:name', upload.single('image'), updateBrands);
adminRouter.delete('/brands/:name', deleteBrands);
// <----------------------Orders---------------->
adminRouter.get('/orders', findAllOrders);
adminRouter.put('/order-status-update/:id', updateOrderStatus);
adminRouter.get('/orders/:id', findAllOrdersByCustomerId);
// <-------------------dashboard----------------->
// <----------------contact us messages--------->
adminRouter.get('/messages', findAllMessages);
adminRouter.get('/dashboard', dashboardDetails);

module.exports = adminRouter