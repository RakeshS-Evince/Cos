const { db } = require('../model/index');
const Account = db.accounts;
const Customer = db.customer;
const Staff = db.staff;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const { sendMail } = require('./emailTemplate');

const register = async (req, res) => {
    const { username, email, password, roleId } = req.body
    const encrypted = await bcrypt.hash(password, 10);
    try {
        let data = await Account.create({ username: username, password: encrypted, email: email, roleId: roleId });
        if (!data) {
            res.send({ message: "Unable to create account" });
            return
        }
        if (Number(roleId) === 1) {
            let info = await Customer.create({ email: email, accountId: data.dataValues.id });
            res.send({ message: 'Account created' });
            return
        }

    } catch (e) {
        res.status(400).send({ message: "Username/email aleready in use." });
        return
    }

}
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = await Account.findOne({ where: { username: username } });
        if (!data) return res.status(404).send({ message: 'User not found' });
        const isMatched = await bcrypt.compare(password, data.dataValues.password);
        if (!isMatched) return res.status(400).send({ message: 'Incorrect password' });
        if (data.dataValues.roleId === 1) {
            let cdata = await Customer.findOne({ where: { accountId: data.dataValues.id }, attributes: ['id'] },)
            let token = jwt.sign({ accountId: data.dataValues.id, roleId: data.dataValues.roleId, customerId: cdata.dataValues.id }, "secretKey", {
                expiresIn: "24h",
            })
            res.send({ message: 'Login successful', username: data.dataValues.username, token: token, id: cdata.dataValues.id });
            return
        }
        let token = jwt.sign({ accountId: data.dataValues.id, roleId: data.dataValues.roleId }, "secretKey", {
            expiresIn: "24h",
        })
        res.send({ message: 'Login successful', username: data.dataValues.username, token: token });
    } catch (e) {
        res.status(400).send({ message: e.message })
    }


}
const forgotPassword = async (req, res) => {
    try {
        const data = await Account.findOne({ where: { email: req.body.email } });
        if (!data) {
            res.send({ message: 'No user is registered with this email' });
            return
        }
        const token = jwt.sign({ id: data.dataValues.id }, 'ResetSecret', { expiresIn: "5m" });
        sendMail(token, data.dataValues.email);
        res.send({ message: 'An email sent to reset your password, please check your email' })
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
}
const resetPassword = async (req, res) => {
    try {
        let user;
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'ResetSecret', (err, decoded) => {
            user = decoded
        });
        const encrypted = await bcrypt.hash(req.body.newPassword, 10);
        const data = await Account.update({ password: encrypted }, { where: { id: user.id } });
        if (!data) {
            res.send({ message: "Unable to reset password at this moment" });
            return
        }
        res.send({ message: "Password reset successful" });
    } catch (e) {
        res.status(400).send({ message: 'Link is expired' })
    }
}

module.exports = { login, register, forgotPassword, resetPassword }