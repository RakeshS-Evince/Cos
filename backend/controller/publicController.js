const publicService = require('../services/publicService');
const getAllIceCreams = async (req, res, next) => {
    try {
        const data = await publicService.findAllIcecream();
        res.send(data)
    } catch (e) {
        next(e);
    }
}
const getOneIceCream = async (req, res, next) => {
    try {
        const data = await publicService.findIceCreamsById(req.params.id)
        res.send(data)
    } catch (e) {
        next(e);
    }
}
const getIceCreamByBrand = async (req, res, next) => {
    try {
        const data = await publicService.findIceCreamsByBrands(req.params.name)
        res.send(data)
    } catch (e) {
        next(e);
    }
}
const getAllBrands = async (req, res, next) => {
    try {
        const data = await publicService.findAllBrands();
        res.send(data)
    } catch (e) {
        next(e);
    }
}
const postMessages = async (req, res, next) => {
    try {
        const data = await publicService.postMessage(req.body)
        res.send(data)
    } catch (e) {
        next(e);
    }
}
const getAllReviews = async (req, res, next) => {
    try {
        const data = await publicService.getAllReviewsByIid(req.params.id)
        res.send(data);
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getAllIceCreams,
    getOneIceCream,
    getIceCreamByBrand,
    getAllBrands,
    postMessages,
    getAllReviews
}