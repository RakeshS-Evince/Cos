const { db } = require("../model/index");
const Categories = db.categories

const findAllCategory = async () => {
    return Categories.findAll();
}
module.exports = { findAllCategory }