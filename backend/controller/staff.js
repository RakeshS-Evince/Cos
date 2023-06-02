const { db } = require('../model/index');
const Account = db.accounts;
const Staff = db.staff;
const Sequelize = db.sequelize;
const bcrypt = require('bcrypt');;
const addStaff = async (req, res) => {
    const { username, email, password, fullname, contact } = req.body
    const encrypted = await bcrypt.hash(password, 10);
    try {
        let data = await Account.create({ username: username, password: encrypted, email: email, roleId: 2 });
        if (!data) {
            res.send({ message: "Unable to create account" });
            return
        }
        let info = await Staff.create({ email: email, accountId: data.dataValues.id, fullname: fullname, contact: contact });
        if (info) {
            res.send({ message: 'Account created' });
        }
    } catch (e) {
        res.status(400).send({ message: "Username/email aleready in use." });
        return
    }
}
const findOneStaff = async (req, res) => {
    try {
        const [results] = await Sequelize.query(`SELECT staffs.id,contact,fullname,accounts.email ,username FROM ${process.env.DB}.staffs join ${process.env.DB}.accounts on staffs.accountId=accounts.id where staffs.id=` + req.params.id)
        res.send(results[0])
    } catch (e) {
        res.status(400).send({ message: "Username/email aleready in use." });
        return
    }
}

const findAllStaffs = async (req, res, next) => {
    try {
        const [results] = await Sequelize.query(`SELECT staffs.id,contact,fullname,accounts.email ,username FROM ${process.env.DB}.staffs join ${process.env.DB}.accounts on staffs.accountId=accounts.id;`);
        if (!results) {
            res.send({ message: "Unable to find staff" });
        }
        res.send(results);
    } catch (e) {
        next(e)
    }

}
const updateStaff = async (req, res, next) => {
    try {
        let { body } = req;
        let o = Object.keys(body)
            .filter((k) => body[k] !== '')
            .reduce((a, k) => ({ ...a, [k]: body[k] }), {});
        const results = await Staff.update(o, { where: { id: req.params.id } });
        const staff = await Staff.findOne({ where: { id: req.params.id } });
        if (o.email) {
            const data = await Account.update({ email: req.body.email }, { where: { id: staff.dataValues.accountId } })
        }
        if (o.username) {
            const data = await Account.update({ username: req.body.username }, { where: { id: staff.dataValues.accountId } })
        }
        if (!results) {
            res.status(400).send({ message: "Unable to update staff" });
            return
        }
        res.send({ message: 'Staff details updated' });
    } catch (e) {
        next(e)
    }

}
const deleteStaff = async (req, res, next) => {
    try {
        const account = await Staff.findOne({ where: { id: req.params.id } });
        if (!account) {
            res.send('')
        }
        const delAcc = await Account.destroy({ where: { id: account.dataValues.accountId } });
        const delStaffDetails = await Staff.destroy({ where: { id: req.params.id } })
        if (!(delAcc || delStaffDetails)) {
            res.send('')
        }
        res.send({ message: 'Staff account deleted' });
    } catch (e) {
        next(e)
    }

}
module.exports = { addStaff, findAllStaffs, updateStaff, deleteStaff, findOneStaff }