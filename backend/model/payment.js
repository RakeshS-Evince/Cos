module.exports = (sequelize, DataTypes) => {
    return sequelize.define('payment', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING
        }
    }
    )
}