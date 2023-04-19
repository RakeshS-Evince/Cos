module.exports = (sequelize, DataTypes) => {
    return sequelize.define('order', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        customerId: {
            type: DataTypes.INTEGER
        },
        totalPrice: {
            type: DataTypes.FLOAT(10, 2)
        },
        shippingCharge: {
            type: DataTypes.FLOAT(10, 2)
        },
        couponDiscount: {
            type: DataTypes.FLOAT(10, 2)
        },
        paymentMethod: {
            type: DataTypes.STRING
        },
        orderAddress: {
            type: DataTypes.TEXT('long')
        },
        date: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },

    },

    )
}