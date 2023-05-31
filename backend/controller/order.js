const { db } = require("../model");
const Order = db.order;
const OrderItem = db.orderItem;
const IceCream = db.iceCream;
const Customer = db.customer;


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
        // let icIdArr = [];
        // data.dataValues?.iceCreams?.forEach(element => {
        //     icIdArr.push(element.id)
        // });
        // const revData = await Review.findAll({ where: Sequelize.and({ customerId: data.dataValues.customerId }, { iceCreamId: { [Op.in]: icIdArr } }), })
        if (!data) {
            throw Error('No Orders found');
        }

        res.send(data);
    } catch (e) {
        res.status(400).send({ message: e.message })
    }

}
const findAllOrders = async (req, res, next) => {
    try {
        const data = await Order.findAll({
            include: [{
                model: Customer,
                attributes: ['id', "fullname"]
            }],
        });
        if (!data) {
            throw Error('No Orders found');
        }
        res.send(data);
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
}
const updateOrderStatus = async (req, res, next) => {
    try {
        const data = await Order.update({ status: req.body.status }, { where: { id: req.params.id } })
        if (!data) {
            throw Error('No Orders found');
        }
        res.send({ message: 'Order status updated' });
    } catch (e) {
        res.status(400).send({ message: e.message })
    }

}
const findAllOrdersByCustomerId = async (req, res, next) => {
    try {
        const data = await Order.findAll({
            include: [{
                model: IceCream,
                attributes: ['id', "name", 'brandName', 'image'],
            }],
            where: {
                customerId: req.params.cid
            }
        })
        if (!data) {
            throw Error('No Orders found');
        }
        res.send(data);
    } catch (e) {
        next(e)
    }
}

module.exports = { placeOrder, findOrder, findOneOrder, findAllOrders, updateOrderStatus, findAllOrdersByCustomerId }