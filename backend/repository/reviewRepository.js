const { Sequelize } = require('sequelize');
const { db, sequelize } = require('../model/index');
const Review = db.review;

const findAllReviewsByCustomerId = async (cid, iid) => {
    const [results] = await sequelize.query(`SELECT fullname FROM ${process.env.DB}.customers join ${process.env.DB}.accounts on customers.accountId=accounts.id where customers.id=` + cid);
    const revData = await Review.findAll({ where: Sequelize.and({ customerId: cid }, { iceCreamId: iid }) });
    return { results: results, revData: revData }
}

module.exports = {
    findAllReviewsByCustomerId
}