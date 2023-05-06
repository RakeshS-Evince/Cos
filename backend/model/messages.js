module.exports = (sequelize, DataTypes) => {
    return sequelize.define('message', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        message: {
            type: DataTypes.STRING
        }
    }
    )
}