const { db } = require("../model")
const jwt = require('jsonwebtoken')
const Customer = db.customer;
const Address = db.address;
const userService = require("../services/userService");

const profile = async (req, res, next) => {
    try {
        const data = await userService.getProfile(req.user.customerId);
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
        const data = await userService.getOwnReview(req.user.customerId, req.query.iid);
        res.send(data);
    } catch (e) {
        next(e)
    }
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
    getCustomerReview
}