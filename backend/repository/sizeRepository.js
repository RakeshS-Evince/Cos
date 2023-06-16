const { db } = require("../model/index");
const Size = db.size;

const findAllSizes = async () => {
    return Size.findAll();
}
module.exports = {
    findAllSizes
}