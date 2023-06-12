const { db, sequelize } = require("../model/index");
const Staff = db.staff;
const createStaff = async (data) => {
    return Staff.create(data);
}
const updateStaff = async (data, id) => {
    return Staff.update(data, { where: { id: id } });
}
const deleteStaff = async (id) => {
    return Staff.destroy({ where: { id: id } });
}
const findOneStaff = async (id) => {
    const [results] = await sequelize.query(`SELECT accountId,staffs.id,contact,fullname,accounts.email ,username FROM ${process.env.DB}.staffs join ${process.env.DB}.accounts on staffs.accountId=accounts.id where staffs.id=` + id)
    return results;
}
const findAllStaffs = async () => {
    const [results] = await sequelize.query(`SELECT accountId,staffs.id,contact,fullname,accounts.email ,username FROM ${process.env.DB}.staffs join ${process.env.DB}.accounts on staffs.accountId=accounts.id;`);
    return results;
}
module.exports = {
    createStaff,
    updateStaff,
    deleteStaff,
    findOneStaff,
    findAllStaffs
}