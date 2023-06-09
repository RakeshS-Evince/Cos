const { db } = require('../model/index');
const Account = db.accounts;
const getAccount = async (id) => {
    return Account.findOne({ where: { id: id } })
}
const findAccountByUsername = async (username) => {
    return Account.findOne({ where: { username: username } })
}
const findAccountByEmail = async (email) => {
    return Account.findOne({ where: { email: email } })
}
const createAccount = async (obj) => {
    return Account.create(obj)
}
const deleteAccount = async (id) => {
    return Account.destroy({ where: { id: id } })
}
const updateAccount = async (obj, whereObj) => {
    return Account.update(obj, { where: whereObj })
}

module.exports = {
    getAccount,
    createAccount,
    deleteAccount,
    updateAccount,
    findAccountByUsername,
    findAccountByEmail
}