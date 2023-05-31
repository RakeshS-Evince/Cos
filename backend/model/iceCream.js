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
        description: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.FLOAT(10, 2)
        },
        image: {
            type: DataTypes.STRING
        },
        quantity: {
            type: DataTypes.INTEGER
        }
    },
        {
            timestamps: false
        }
    )
}