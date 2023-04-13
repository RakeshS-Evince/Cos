const db = require('../model/index');
const IceCream = db.iceCream;
const getAllIceCreams = async (req, res, next) => {
    const data = await IceCream.findAll();
    res.send(data);
}
const getOneIceCream = async (req, res, next) => {
    const data = await IceCream.findOne({ where: { id: req.params.id } });
    res.send(data);
}
const addIceCream = async (req, res, next) => {
    const data = await IceCream.create(req.body);
    if (!data) {
        res.send({ message: "Some error occured while adding icecream" })
    }
    res.send({ message: "IceCream added" });
}
const updateIceCream = async (req, res, next) => {
    const data = await IceCream.create(req.body, { where: { id: req.params.id } });
    if (!data) {
        res.send({ message: "Some error occured while updating icecream" })
    }
    res.send({ message: "IceCream Updated" });
}

module.exports = { getAllIceCreams, getOneIceCream, addIceCream, updateIceCream }