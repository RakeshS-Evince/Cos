const { db } = require('../model/index');
const Brands = db.brands;
const getAllBrands = async (req, res, next) => {
    try {
        const data = await Brands.findAll();
        res.send(data);
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
}
const getOneBrands = async (req, res, next) => {
    try {
        const data = await Brands.findOne({ where: { name: req.params.name } });
        res.send(data);
    } catch ({ message }) {
        res.status(400).send({ message: message })
    }

}
const addBrands = async (req, res, next) => {
    try {
        const data = await Brands.create(req.body);
        if (!data) {
            res.send({ message: "Some error occured while adding Brands" })
        }
        res.send({ message: "Brand added" });
    } catch ({ message }) {
        res.status(400).send({ message: message });
    }

}
const updateBrands = async (req, res, next) => {
    try {
        const data = await Brands.update(req.body, { where: { name: req.params.name } });
        if (!data) {
            res.send({ message: "Some error occured while updating Brands" });
            return
        }
        res.send({ message: "Brands Updated" });
    } catch ({ message }) {
        res.status(400).send({ message: message });
    }


}
const deleteBrands = async (req, res, next) => {
    try {
        const data = await Brands.destroy({ where: { name: req.params.name } });
        if (!data) {
            res.send({ message: "Some error occured while deleting Brands" });
            return
        }
        res.send({ message: "Brand deleted" });
    } catch ({ message }) {
        res.status(400).send({ message: message });
    }

}


module.exports = { getAllBrands, getOneBrands, addBrands, updateBrands, deleteBrands }