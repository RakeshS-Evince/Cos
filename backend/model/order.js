module.exports = (sequelize, DataTypes) => {
    return sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        customerId: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.INTEGER
        },
        paymentMethod: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        }
    },
        {
            timestamps: false
        }
    )
}