const { Sequelize } = require("sequelize");
const { db, sequelize } = require("../model");
const Review = db.review;
const Customer = db.customer;
const Order = db.order;
const IceCream = db.iceCream;
const getCustomerReview = async (req, res, next) => {
    try {
        const [results] = await sequelize.query("SELECT fullname FROM cos.customers join cos.accounts on customers.accountId=accounts.id where customers.id=" + req.query.cid);
        const revData = await Review.findAll({ where: Sequelize.and({ customerId: req.query.cid }, { iceCreamId: req.query.iid }) });
        if (!revData.length) {
            res.send({ fullname: results[0].fullname });
            return
        }
        revData[0].dataValues.fullname = results[0].fullname
        res.send(revData[0])
    }
    catch (e) {
        next(e)
    }
}
const getAllReviews = async (req, res, next) => {
    try {
        const revData = await Review.findAll(
            {
                include: [{
                    model: Customer,
                    attributes: ['fullname']
                }]
            }
        );
        res.send(revData)
    }
    catch (e) {
        next(e)
    }
}
const addRating = async (req, res, next) => {
    try {
        let orderedICIdArr = [];
        const data = await Order.findAll({
            include: [{
                model: IceCream,
                attributes: ['id'],
            }],
            where: {
                customerId: req.query.cid
            }
        })
        data?.forEach(element => {
            element?.dataValues?.iceCreams?.forEach(element => {
                orderedICIdArr.push(element?.id)
            })
        })
        if (!Array.from(new Set(orderedICIdArr)).includes(parseInt(req.query.iid))) {
            res.send({ message: `You haven't ordered this item, so you can't add review.` });
            return
        }
        const revData = await Review.update(req.body, { where: Sequelize.and({ customerId: req.query.cid }, { iceCreamId: req.query.iid }) });
        if (!revData[0]) {
            const addData = await Review.create({ ...req.body, customerId: req.query.cid, iceCreamId: req.query.iid });
        }
        res.send({ message: 'Thanks for the rating' })
    }
    catch (e) {
        next(e)
    }
}
module.exports = { getCustomerReview, addRating, getAllReviews }