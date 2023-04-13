module.exports = (sequelize, DataTypes) => {
    return sequelize.define('iceCream', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.STRING
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        brand: {
            type: DataTypes.STRING
        }
    },
        {
            timestamps: false
        }
    )
}