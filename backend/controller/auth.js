const db = require('../model/index');
const Account = db.accounts;
const bcrypt = require('bcrypt')

const signup = async (req, res) => {
    const { username, email, password } = req.body
    const encrypted = await bcrypt.hash(password, 10)
    let data = Account.create({ username: username, password: encrypted, email: email })
    if (data) {
        res.send('Account created')
    }
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