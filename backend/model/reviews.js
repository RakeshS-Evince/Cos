
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('review', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        summary: {
            type: DataTypes.STRING,
        },
        review: {
            type: DataTypes.STRING,
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        iceCreamId: {
            type: DataTypes.INTEGER
        },
        customerId: {
            type: DataTypes.INTEGER
        }
    })
}