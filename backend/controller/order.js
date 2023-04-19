const { db } = require("../model");

const Order = db.order;
const OrderItem = db.orderItem;
const IceCream = db.iceCream;

const placeOrder = async (req, res, next) => {
    try {
        const info = (({ orderItems, ...rest }) => rest)(req.body)
        const data = await Order.create({ ...info, customerId: req.user.customerId, id: "OD" + new Date().getTime().toString() });
        if (!data) {
            res.send({ message: "Something went wrong" });
            return
        }
        for (let i = 0; i < req.body.orderItems.length; i++) {
            const items = await OrderItem.create({ orderId: data.dataValues.id, iceCreamId: req.body.orderItems[i].id, quantity: req.body.orderItems[i].quantity })
        }
        res.send({ message: "Order Placed", orderId: data.dataValues.id })
    } catch (e) {
        res.status(400).send({ message: e.message })
    }

}
const findOrder = async (req, res, next) => {
    try {
        const data = await Order.findAll({
            include: [{
                model: IceCream,
                attributes: ['id', "name", 'brandName', 'image'],
            }],
            where: {
                customerId: req.user.customerId
            }
        },
        );
        if (!data) {
            throw Error('No Orders found');
        }
        res.send(data);
    } catch (e) {
        res.status(400).send({ message: e.message })
    }

}
const findOneOrder = async (req, res, next) => {
    try {
        const data = await Order.findOne({

            include: [{
                model: IceCream,
                attributes: ['id', "name", 'brandName', 'image', 'price'],
            }],
            where: {
                id: req.params.id
            },
        },
        );
        if (!data) {
            throw Error('No Orders found');
        }
        res.send(data);
    } catch (e) {
        res.status(400).send({ message: e.message })
    }

}

module.exports = { placeOrder, findOrder, findOneOrder }