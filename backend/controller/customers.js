const { sequelize } = require('../model')
const getAllCustomers = async (req, res, next) => {
    try {
        const [results] = await sequelize.query("SELECT customers.id,contact,fullname,city,contact,accounts.email ,username FROM cos.customers join cos.accounts on customers.accountId=accounts.id");
        res.send(results)
    } catch (e) {
        res.send({ message: e.message })
    }
}
const getOneCustomer = async (req, res, next) => {
    try {
        const [results] = await sequelize.query("SELECT customers.id,contact,fullname,city,contact,accounts.email ,username FROM cos.customers join cos.accounts on customers.accountId=accounts.id");
        res.send(results)
    } catch (e) {
        res.send({ message: e.message })
    }
}
module.exports = {
    getAllCustomers,
    getOneCustomer
}