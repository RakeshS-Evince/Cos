const { db } = require('../model/index');
const IceCream = db.iceCream;
const Brands = db.brands;
const Orders = db.order;

const dashboardDetails = async (req, res) => {
    try {
        const iceCreamCount = await IceCream.count();
        const brandCount = await Brands.count();
        const orderSuccessCount = await Orders.count({ where: { status: "Delivered" } })
        const orderPendingCount = await Orders.count({ where: { status: "Placed" } })
        res.send({iceCreams:iceCreamCount,brands:brandCount,success:orderSuccessCount,pending:orderPendingCount})
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
}

module.exports={dashboardDetails}