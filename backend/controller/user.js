const { db } = require("../model")
const jwt = require('jsonwebtoken')
const Customer = db.customer;
const Address = db.address;
const { sequelize } = require('../model')


const profile = async (req, res, next) => {

    try {
        const [results, metadata] = await sequelize.query("SELECT contact,fullname,city,contact,accounts.email ,username FROM cos.customers join cos.accounts on customers.accountId=accounts.id where customers.accountId=" + req.user.accountId);
        res.send(results[0])
    } catch (e) {
        res.send({ message: e.message })
    }

}
const getAllAddress = async (req, res, next) => {
    try {
        const data = await Address.findAll({ where: { customerId: req.user.customerId } });
        res.send(data);
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}
const makeDefaultAddress = async (req, res, next) => {
    try {
        const data = await Address.update({ default: false }, { where: { customerId: req.user.customerId, default: true } });
        const updateData = await Address.update({ default: true }, { where: { customerId: req.user.customerId, id: req.params.id } });
        res.send({ message: "Default Address changed" });
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}
const editAddress = async (req, res, next) => {
    try {
        const data = await Address.update(req.body, { where: { customerId: req.user.customerId, id: req.params.id } });
        res.send({ message: "Address Updated" });
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}
const getOneAddress = async (req, res, next) => {
    try {
        const data = await Address.findOne({ where: { id: req.params.id } });
        res.send(data);
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}
const deleteOneAddress = async (req, res, next) => {
    try {
        const data = await Address.destroy({ where: { id: req.params.id } });
        res.send({ message: "Address deleted" });
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}
const addAddress = async (req, res, next) => {
    try {
        const addData = await Address.update({ default: false }, { where: { customerId: req.user.customerId, default: true } });
        const data = await Address.create({ ...req.body, customerId: req.user.customerId });
        res.send({ message: "Address Added" });
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}
const getDefaultAddress = async (req, res, next) => {
    try {
        const data = await Address.findOne({ where: { customerId: req.user.customerId, default: true } })
        res.send(data);
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}
const updateProfile = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        let user;
        jwt.verify(token, 'secretKey', (err, decoded) => {
            user = decoded
        });
        if (!user) {
            res.status(401).send({ message: "Token Error" })
            return
        }
        const dataToUpdate = (({ username, ...rest }) => rest)(req.body);
        let data = await Customer.update(dataToUpdate, { where: { accountId: user?.accountId } });
        if (!data) {
            res.status(400).send({ message: "Profile updated successfully" });
        }
        res.send({ message: "Profile updated successfully" });
    } catch (e) {
        res.send({ message: e.message });
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
    deleteOneAddress
}