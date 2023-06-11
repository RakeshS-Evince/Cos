const { db } = require('../model/index');
const IceCream = db.iceCream;
const getAllIceCream = async () => {
    return IceCream.findAll();
}
const getAllIceCreamByBrand = async (brand) => {
    return IceCream.findAll({ where: { brandName: brand } });
}
const getOneIceCream = async (id) => {
    return IceCream.findOne({ where: { id: id } })
}
const createIceCream = async (obj) => {
    return IceCream.create(obj)
}
const deleteIceCream = async (id) => {
    return IceCream.destroy({ where: { id: id } })
}
const updateIceCream = async (obj, whereObj) => {
    return IceCream.update(obj, { where: whereObj })
}
const getIceCreamCount=async()=>{
    return IceCream.count()
}

module.exports = {
    getAllIceCream,
    getAllIceCreamByBrand,
    getOneIceCream,
    createIceCream,
    deleteIceCream,
    updateIceCream,
    getIceCreamCount
}