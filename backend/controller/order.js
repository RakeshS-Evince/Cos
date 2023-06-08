const { db } = require("../model");
const Order = db.order;
const crypto = require('crypto');
const OrderItem = db.orderItem;
const IceCream = db.iceCream;
const Customer = db.customer;
const Payment = db.payment;
const Razorpay = require('razorpay');


const placeOrder = async (req, res, next) => {
    try {
        const info = (({ orderItems, ...rest }) => rest)(req.body)

        if (info.paymentMethod == 'prepaid') {
            var instance = new Razorpay({
                key_id: process.env.KEY_ID,
                key_secret: process.env.KEY_SECRET
            })
            var options = {
                amount: info.totalPrice * 100,
                receipt: "gurkaran_order_54654",
                currency: "INR",
                payment_capture: '0'
            }
            instance.orders.create(options, async function (err, order) {
                const paymentData = await Payment.create({ id: order.id, status: "pending" });
                const data = await Order.create({ ...info, customerId: req.user.customerId, id: "OD" + new Date().getTime().toString(), paymentId: paymentData.dataValues.id });
                for (let i = 0; i < req.body.orderItems.length; i++) {
                    const items = await OrderItem.create({ orderId: data.dataValues.id, iceCreamId: req.body.orderItems[i].id, quantity: req.body.orderItems[i].quantity })
                }
                res.send({ ...order, orderId: data.dataValues.id });
            })
        } else {
            const data = await Order.create({ ...info, customerId: req.user.customerId, id: "OD" + new Date().getTime().toString() });
            if (!data) {
                res.send({ message: "Something went wrong" });
                return
            }
            for (let i = 0; i < req.body.orderItems.length; i++) {
                const items = await OrderItem.create({ orderId: data.dataValues.id, iceCreamId: req.body.orderItems[i].id, quantity: req.body.orderItems[i].quantity })
            }
            res.send({ orderId: data.dataValues.id })
        }
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
            }, {
                model: Payment
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
const orderCallback = async (req, res) => {
    try {
        let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
        let generated_signature = crypto.createHmac('sha256', '1dEYfpeJ5oMTBiNYM8SLM6kv')
            .update(body.toString())
            .digest('hex');
        if (generated_signature == req.body.razorpay_signature) {
            const paymentData = await Payment.update({ status: "success" }, { where: { id: req.body.razorpay_order_id } })
            res.redirect(process.env.URL + "/#/payment-success/" + req.params.orderId);
        } else {
            res.redirect(process.env.URL + "/#/payment-failure" + req.params.orderId);
        }
    } catch (e) {
        res.status(500).send({ message: "Internal server error" })
    }


}
const retryPayment = async (req, res, next) => {
    try {
        let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
        let generated_signature = crypto.createHmac('sha256', '1dEYfpeJ5oMTBiNYM8SLM6kv')
            .update(body.toString())
            .digest('hex');
        if (generated_signature == req.body.razorpay_signature) {
            const paymentData = await Payment.update({ status: "success" }, { where: { id: req.query.pid } })
            res.redirect(process.env.URL + "/#/payment-success/" + req.query.oid);
        } else {
            res.redirect(process.env.URL + "/#/payment-failure" + req.query.oid);
        }
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

module.exports = { placeOrder, findOrder, findOneOrder, findAllOrders, updateOrderStatus, findAllOrdersByCustomerId, orderCallback, retryPayment }