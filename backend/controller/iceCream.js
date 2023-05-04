const { db } = require('../model/index');
const IceCream = db.iceCream;
const getAllIceCreams = async (req, res, next) => {
    try {
        const data = await IceCream.findAll();
        res.send(data);
    } catch (e) {
        res.status(400).send({ message: e.message })
    }

}

const getIceCreamByBrand = async (req, res, next) => {
    try {
        const data = await IceCream.findAll({ where: { brandName: req.params.name } });
        res.send(data);
    } catch ({ message }) {
        res.status(400).send({ message: message })
    }

}
const getOneIceCream = async (req, res, next) => {
    try {
        const data = await IceCream.findOne({ where: { id: req.params.id } });
        res.send(data);
    } catch ({ message }) {
        res.status(400).send({ message: message })
    }

}
const deleteIceCream = async (req, res, next) => {
    try {
        const data = await IceCream.destroy({ where: { id: req.params.id } });
        res.send({ message: 'Ice-cream deleted' });
    } catch ({ message }) {
        res.status(400).send({ message: message })
    }

}
const addIceCream = async (req, res, next) => {
    const data = await IceCream.create(req.body);
    if (!data) {
        res.send({ message: "Some error occured while adding icecream" })
    }
    res.send({ message: "IceCream added" });
}
const updateIceCream = async (req, res, next) => {
    const data = await IceCream.update(req.body, { where: { id: req.params.id } });
    if (!data[0]) {
        res.send({ message: "Some error occured while updating icecream" });
        return
    }
    res.send({ message: "IceCream Updated" });
}

const saveCart = async (req, res, next) => {
    try {
        const data = await db.cart.create({ IceCreams: req.body.iceCreams, customerId: req.body.customerId });
        if (!data) {
            res.send({ message: "Unable to save item in cart" });
            return
        }
        res.send({ message: "Cart saved" })
    } catch (e) {
        res.send({ message: e.message })
    }
}

module.exports = { getAllIceCreams, getOneIceCream, addIceCream, updateIceCream, deleteIceCream,getIceCreamByBrand }