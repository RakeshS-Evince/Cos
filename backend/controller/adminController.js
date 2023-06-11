const adminService = require('../services/adminService')

const findAllMessages = async (req, res, next) => {
    try {
        const data = await adminService.findAllMessages();
        res.send(data);
    } catch (e) {
        next(e);
    }
}
const dashboardDetails = async (req, res, next) => {
    try {
        const data = await adminService.getDashBoardDetails();
        res.send(data);
    } catch (e) {
        next(e);
    }

}
const addIceCream = async (req, res, next) => {
    try {
        const data = await adminService.addIceCream(req.body);
        res.send(data);
    } catch (e) { next(e) }
}
const updateIceCream = async (req, res, next) => {
    try {
        const data = await adminService.updateIceCream(req.params.id, req.body);
        res.send(data);
    } catch (e) { next(e) }
}
const deleteIceCream = async (req, res, next) => {
    try {
        const data = await adminService.deleteIceCream(req.params.id);
        res.send(data);
    } catch (e) { next(e) }
}
const addBrands = async (req, res, next) => {
    try {
        const data = await adminService.addBrand(req.body);
        res.send(data);
    } catch (e) { next(e) }
}
const updateBrands = async (req, res, next) => {
    try {
        const data = await adminService.updateBrand(req.body, req.params.name);
        res.send(data);
    } catch (e) { next(e) }
}
const deleteBrands = async (req, res, next) => {
    try {
        const data = await adminService.deleteBrand(req.params.name);
        res.send(data);
    } catch (e) { next(e) }
}
const findAllOrders = async (req, res, next) => {
    try {
        const data = await adminService.findAllOrders();
        res.send(data);
    } catch (e) { next(e) }
}
const updateOrderStatus = async (req, res, next) => {
    try {
        const data = await adminService.updateOrderStatus(req.body.status, req.params.id);
        res.send(data);
    } catch (e) { next(e) }
}
const findAllOrdersByCustomerId = async (req, res, next) => {
    try {
        const data = await adminService.findAllOrdersByCustomerId(req.params.id);
        res.send(data);
    } catch (e) { next(e) }
}
const getAllReviews = async (req, res, next) => {
    try {
        const data = await adminService.findAllReviews();
        res.send(data);
    } catch (e) { next(e) }
}
const getAllReviewsById= async (req, res, next) => {
    try {
        const data = await adminService.findReviewById(req.params.id);
        res.send(data);
    } catch (e) { next(e) }
}

module.exports = {
    findAllMessages,
    dashboardDetails,
    addIceCream,
    updateIceCream,
    deleteIceCream,
    addBrands,
    updateBrands,
    deleteBrands,
    findAllOrders,
    updateOrderStatus,
    findAllOrdersByCustomerId,
    getAllReviews,
    getAllReviewsById
}