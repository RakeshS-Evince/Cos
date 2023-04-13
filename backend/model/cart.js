module.exports = (sequelize, DataTypes) => {
    return sequelize.define('cart', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        iceCreams: {
            type: DataTypes.STRING
        },
    },
        {
            timestamp: false
        }
    )
}