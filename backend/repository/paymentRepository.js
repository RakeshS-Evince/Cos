const { db } = require("../model/index");
const Payment = db.payment;
const updatePaymentSuccess = (id) => {
    return Payment.update({ status: "success" }, { where: { id: id } })
}
const createPendingPayment = (id) => {
    return Payment.create({ id: id, status: "pending" })
}
module.exports = {
    createPendingPayment,
    updatePaymentSuccess
}