const { db, sequelize } = require('../model/index');
const Customer = db.customer;

const createCustomer = async (data) => {
    return Customer.create(data);
}
const findCustomerId = async (accountId) => {
    return Customer.findOne({ where: { accountId: accountId }, attributes: ['id'] },)
}
const findCustomer = async (id) => {
    const [results] = await sequelize.query(`SELECT contact,fullname,contact,accounts.email ,username FROM ${process.env.DB}.customers join ${process.env.DB}.accounts on customers.accountId=accounts.id where customers.accountId=${id}`);
    return results[0];
}
const updateCustomer = async (obj, whereObj) => {
    return Customer.update(obj, { where: whereObj })
}
module.exports = {
    createCustomer,
    findCustomerId,
    findCustomer,
    updateCustomer
}
