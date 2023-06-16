module.exports = (sequelize, DataTypes) => {
    return sequelize.define('priceBySize', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT(10, 2)
        },
    },
        {
            timestamps: false
        }
    )
}