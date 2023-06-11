const { Sequelize, Op } = require('sequelize');
const { db, sequelize } = require('../model/index');
const Review = db.review;
const Customer = db.customer;
const IceCream = db.iceCream;

const findAllReviewsByCustomerId = async (cid, iid) => {
    const [results] = await sequelize.query(`SELECT fullname FROM ${process.env.DB}.customers join ${process.env.DB}.accounts on customers.accountId=accounts.id where customers.id=` + cid);
    const revData = await Review.findAll({ where: Sequelize.and({ customerId: cid }, { iceCreamId: iid }) });
    return { results: results, revData: revData }
}
const addReview = async (cid, iid, data) => {
    return Review.create({ ...data, customerId: cid, iceCreamId: iid });
}
const findReviewExists = async (cid, iid) => {
    return Review.findAll({ where: Sequelize.and({ customerId: cid }, { iceCreamId: iid }) });
}
const findAllReviewsByIceCreamId = async (iid) => {
    return Review.findAll({
        include: [{
            model: Customer,
            attributes: ['fullname']
        }], where: Sequelize.and({ iceCreamId: iid }, { summary: { [Op.not]: null } })
    })
}
const findAllReviews = async () => {
    return Review.findAll(
        {
            include: [{
                model: Customer,
                attributes: ['fullname']
            }, {
                model: IceCream,
                attributes: ['name']
            }]
        }
    );
}
const findReviewById = async (id) => {
    return Review.findOne({
        include: [{
            model: Customer,
            attributes: ['fullname']
        }, {
            model: IceCream,
            attributes: ['name']
        }]
    }, { where: { id: id } })
}
module.exports = {
    findAllReviewsByCustomerId,
    addReview,
    findReviewExists,
    findAllReviewsByIceCreamId,
    findAllReviews,
    findReviewById
}