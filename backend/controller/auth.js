const { db } = require('../model/index');
const Account = db.accounts;
const Customer = db.customer;
const Staff = db.staff;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const { username, email, password, roleId } = req.body
    const encrypted = await bcrypt.hash(password, 10);
    try {
        let data = await Account.create({ username: username, password: encrypted, email: email, roleId: roleId });
        if (data) {
            if (Number(roleId) === 1) {
                let info = await Customer.create({ email: email, accountId: data.dataValues.id });
                res.send({ message: 'Account created' });
                return
            }
            if (Number(roleId) === 2) {
                let info = await Staff.create({ email: email, accountId: data.dataValues.id });
                res.send({ message: 'Account created' });
                return
            }
        }
    } catch (e) {
        res.status(400).send({ message: "Username/email aleready in use." });
        return
    }
    res.send({ message: "Unable to create account" });
}
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = await Account.findOne({ where: { username: username } });
        if (!data) return res.status(404).send({ message: 'User not found' });
        const isMatched = await bcrypt.compare(password, data.dataValues.password);
        if (!isMatched) return res.status(400).send({ message: 'Incorrect password' });
        let cdata = await Customer.findOne({ where: { accountId: data.dataValues.id }, attributes: ['id'] },)
        let token = jwt.sign({ accountId: data.dataValues.id, roleId: data.dataValues.roleId, customerId: cdata.dataValues.id }, "secretKey", {
            expiresIn: "24h",
        })
        res.send({ message: 'Login successful', token: token, id: cdata.dataValues.id });
    } catch (e) {
        res.status(400).send({ message: e.message })
    }


}

module.exports = { login, register }