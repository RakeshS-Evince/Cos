const { Op } = require('sequelize');
const { db, sequelize } = require('../model/index');
const IceCream = db.iceCream;
const Review = db.review;
const Size = db.size;
const getAllIceCream = async () => {
    return IceCream.findAll({
        include: [{
            model: Size,
            attributes: ["size"]
        }, {
            model: Review,
            attributes: ['rating']
        }]
    });
}
const findMinMax = async () => {
    return IceCream.findAll({ attributes: [[sequelize.fn('min', sequelize.col('price')), 'minPrice'], [sequelize.fn('max', sequelize.col('price')), 'maxPrice']] })
}
const getAllIceCreamByBrand = async (brand) => {
    return IceCream.findAll({
        include: [{
            model: Size,
            attributes: ["size"]
        }, {
            model: Review,
            attributes: ['rating']
        }], where: { brandName: brand }
    });
}
const getOneIceCream = async (id) => {
    return IceCream.findOne({
        include: {
            model: Size
        },
        where: { id: id }
    })
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
const getIceCreamCount = async () => {
    return IceCream.count()
}

module.exports = {
    getAllIceCream,
    getAllIceCreamByBrand,
    getOneIceCream,
    createIceCream,
    deleteIceCream,
    updateIceCream,
    getIceCreamCount,
    findMinMax
}