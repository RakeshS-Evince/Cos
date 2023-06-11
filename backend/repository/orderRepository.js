const { db } = require('../model/index');
const Order = db.order;
const OrderItem = db.orderItem;
const IceCream = db.iceCream;
const Payment = db.payment;
const Customer = db.customer

const findAllOrders = async () => {
    return Order.findAll({
        include: [{
            model: Customer,
            attributes: ['id', "fullname"]
        }],
    });
}
const findCustomersOrder = async (cid) => {
    return Order.findAll({
        include: [{
            model: IceCream,
            attributes: ['id'],
        }],
        where: {
            customerId: cid
        }
    })
}

const createAnOrder = async (orderData) => {
    return Order.create(orderData);
}
const saveOrderItems = async (items) => {
    return OrderItem.bulkCreate(items);
}
const findUserOrders = async (id) => {
    return Order.findAll({
        include: [{
            model: IceCream,
            attributes: ['id', "name", 'brandName', 'image'],
        }],
        where: {
            customerId: id
        }
    })
}
const findOneOrder = async (id) => {
    return Order.findOne({
        include: [{
            model: IceCream,
            attributes: ['id', "name", 'brandName', 'image', 'price'],
        }, {
            model: Payment
        }],
        where: {
            id: id
        },
    })
}
const updateOrderStatus = async (status, id) => {
    return Order.update({ status: status }, { where: { id: id } })
}

const findAllOrdersByCustomerId = async (id) => {
    return Order.findAll({
        include: [{
            model: IceCream,
            attributes: ['id', "name", 'brandName', 'image'],
        }],
        where: {
            customerId: id
        }
    })
}
const getOrderSuccessCount = async () => {
    return Order.count({ where: { status: "Delivered" } })
}
const getOrderPendingCount = async () => {
    return Order.count({ where: { status: "Placed" } })
}
module.exports = {
    findCustomersOrder,
    createAnOrder,
    saveOrderItems,
    findUserOrders,
    findOneOrder,
    findAllOrders,
    updateOrderStatus,
    findAllOrdersByCustomerId,
    getOrderSuccessCount,
    getOrderPendingCount
}