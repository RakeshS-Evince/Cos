const db = require('../model/index');
const Account = db.accounts;
const Customer = db.customer;
const bcrypt = require('bcrypt')

const signup = async (req, res) => {
    const { username, email, password, roleId } = req.body
    const encrypted = await bcrypt.hash(password, 10)
    let data = await Account.create({ username: username, password: encrypted, email: email, roleId });
    if (data) {
        if (roleId === 1) {
            let info = await Customer.create({ email: email, accountId: data.dataValues.id });
        }
        res.send('Account created');
        return
    }
    res.send({ message: "Unable to create account" });
}
const login = async (req, res) => {
    const { username, password } = req.body;
    const data = await Account.findOne({ where: { username: username } });
    if (!data) return res.send('User not found');
    const isMatched = await bcrypt.compare(password, data.dataValues.password);
    if (!isMatched) return res.send('Incorrect password');
    res.send('Login successfull');
}

module.exports = { login, signup }