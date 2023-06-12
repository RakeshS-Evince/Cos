const { db } = require('../model/index');
const Address = db.address;

const findAllAddress = async (id) => {
    return Address.findAll({ where: { customerId: id } })
}
const findOneAddress = async (id) => {
    return Address.findOne({ where: { id: id } })
}
const deleteAddress = async (id) => {
    return Address.destroy({ where: { id: id } })
}
const addAddress = async (cid, data) => {
    const updateData = await Address.update({ default: false }, { where: { customerId: cid, default: true } });
    const addressData = await Address.create({ ...data, customerId: cid });
    return addressData;
}
const updateAddress = async (cid, id, data) => {
    return Address.update(data, { where: { customerId: cid, id: id } });
}
const makeDefaultAddress = async (cid, id) => {
    await Address.update({ default: false }, { where: { customerId: cid, default: true } });
    return Address.update({ default: true }, { where: { customerId: cid, id: id } });
}
const getDefaultAddress = async (cid) => {
    return Address.findOne({ where: { customerId: cid, default: true } })
}
module.exports = {
    findAllAddress,
    findOneAddress,
    deleteAddress,
    addAddress,
    updateAddress,
    makeDefaultAddress,
    getDefaultAddress
}