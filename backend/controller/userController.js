const userService = require("../services/userService");

const profile = async (req, res, next) => {
    try {
        const data = await userService.getProfile(req.user.accountId);
        res.send(data);
    } catch (e) {
        next(e)
    }

}
const getAllAddress = async (req, res, next) => {
    try {
        const data = await userService.getAllAddress(req.user.customerId);
        res.send(data);
    } catch (e) {
        next(e)
    }
}
const getOneAddress = async (req, res, next) => {
    try {
        const data = await userService.getOneAddress(req.params.id);
        res.send(data);
    } catch (e) {
        next(e)
    }
}
const makeDefaultAddress = async (req, res, next) => {
    try {
        const data = await userService.makeDefaultAddress(req.user.customerId, req.params.id)
        res.send({ message: "Default Address changed" });
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}
const editAddress = async (req, res, next) => {
    try {
        const data = await userService.updateOneAddress(req.user.customerId, req.params.id, req.body)
        res.send(data);
    } catch (e) {
        next(e)
    }
}
const deleteOneAddress = async (req, res, next) => {
    try {
        const data = await userService.deleteOneAddress(req.params.id);
        res.send(data)
    } catch (e) {
        next(e)
    }
}
const addAddress = async (req, res, next) => {
    try {
        const data = await userService.addOneAddress(req.user.customerId, req.body)
        res.send(data);
    } catch (e) {
        next(e)
    }
}
const getDefaultAddress = async (req, res, next) => {
    try {
        const data = await userService.getDefaultAddress(req.user.customerId)
        res.send(data);
    } catch (e) {
        next(e)
    }
}
const updateProfile = async (req, res, next) => {
    try {
        const data = await userService.updateProfile(req.user.customerId, req.user.accountId, req.body);
        res.send(data);
    } catch (e) {
        next(e)
    }
}
const getCustomerReview = async (req, res, next) => {
    try {
        const data = await userService.getOwnReview(req.user.customerId, req.params.iid);
        res.send(data);
    } catch (e) {
        next(e)
    }
}
const postReview = async (req, res, next) => {
    try {
        const data = await userService.addRating(req.user.customerId, req.params.iid, req.body);
        res.send(data);
    } catch (e) {
        next(e)
    }
}
const placeOrder = async (req, res, next) => {
    try {
        const data = await userService.placeOrder(req.body, req.user.customerId);
        res.send(data);
    } catch (e) {
        next(e);
    }
}
const cancelOrder = async (req, res, next) => {
    try {
        const data = await userService.cancelOrder(req.params.id);
        res.send(data);
    } catch (e) {
        next(e);
    }
}
const findMyOrders = async (req, res, next) => {
    try {
        const orderData = await userService.findUserOrders(req.user.customerId);
        res.send(orderData);
    } catch (e) { next(e) }
}
const findOneOrder = async (req, res, next) => {
    try {
        const orderData = await userService.findOneOrder(req.params.id);
        res.send(orderData);
    } catch (e) { next(e) }
}
const verifyPayment = async (req, res, next) => {
    try {
        const url = await userService.verifyPayment(req.body, req.params.orderId);
        res.redirect(url);
    } catch (e) { next(e) }
}
const retryPayment = async (req, res, next) => {
    try {
        const url = await userService.retryPayment(req.body, req.params.orderId);
        res.redirect(url);
    } catch (e) { next(e) }
}



module.exports = {
    profile,
    updateProfile,
    getAllAddress,
    makeDefaultAddress,
    getDefaultAddress,
    editAddress,
    addAddress,
    getOneAddress,
    deleteOneAddress,
    getCustomerReview,
    postReview,
    placeOrder,
    findMyOrders,
    findOneOrder,
    verifyPayment,
    retryPayment,
    cancelOrder
}