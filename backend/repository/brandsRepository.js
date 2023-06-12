const { db } = require('../model/index');
const Brands = db.brands;

const getAllBrands = async () => {
    return Brands.findAll();
}
const createBrand = async (data) => {
    return Brands.create(data);
}
const updateBrand = async (data, name) => {
    return Brands.update(data, { where: { name: name } });
}
const deleteBrand = async (name) => {
    return Brands.destroy({ where: { name: name } });
}
const getBrandsCount = async () => {
    return Brands.count();
}
module.exports = { getAllBrands, createBrand, updateBrand, deleteBrand, getBrandsCount }