const express = require("express");
const { upload } = require("../middleware/multer");
const { isAdminOrStaff } = require("../middleware/authorizeUser");
const { addIceCream, updateIceCream, deleteIceCream } = require("../controller/iceCream");
const { addBrands, updateBrands, deleteBrands } = require("../controller/brands");
const { getAllMessages, dashboardDetails } = require("../controller/dashboard");
const { findAllOrders, updateOrderStatus, findAllOrdersByCustomerId } = require("../controller/order");
const { verifyAuth } = require("../middleware/auth");
const staffRouter = express.Router();
// <--------------------------------------------admin/staff only routes------------------------------>
staffRouter.use(verifyAuth);
staffRouter.use(isAdminOrStaff);
// <---------------ice-cream crud--------------->
staffRouter.post('/ice-creams', upload.single('image'), addIceCream);
staffRouter.put('/ice-creams/:id', upload.single('image'), updateIceCream);
staffRouter.delete('/ice-creams/:id', deleteIceCream);
// <----------------Brands CRUD----------------->
staffRouter.post('/brands', upload.single('image'), addBrands);
staffRouter.put('/brands/:name', upload.single('image'), updateBrands);
staffRouter.delete('/brands/:name', deleteBrands);
// <----------------contact us messages--------->
staffRouter.get('/messages', getAllMessages)
// <----------------------Orders---------------->
staffRouter.get('/orders', findAllOrders);
staffRouter.put('/order-status-update/:id', updateOrderStatus);
staffRouter.get('/orders/:cid', findAllOrdersByCustomerId);
// <-------------------dashboard----------------->
staffRouter.get('/dashboard', dashboardDetails);

module.exports = staffRouter