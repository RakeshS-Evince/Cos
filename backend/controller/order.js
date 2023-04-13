const db = require("../model")

const Order = db.order;
const OrderItem = db.orderItem;

const placeOrder = async (req, res, next) => {
    try {
        const { customerId, date, paymentMethod, price, orderItem } = req.body
        const data = await Order.create({ customerId: customerId, date: date, paymentMethod: paymentMethod, price: price, status: "Placed" });
        if (!data) {
            res.send({ message: "Something went wrong" });
            return
        }
        for (let i = 0; i < orderItem.length; i++) {
            const items = await OrderItem.create({ orderId: data.dataValues.id, iceCreamId: orderItem[i].id, quantity: orderItem[i].quantity })
        }
        res.send({ message: "Order Placed" })
    } catch (e) {
        res.send({ message: e.message })
    }

}

module.exports = { placeOrder }