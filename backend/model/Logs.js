module.exports = (sequelize, DataTypes) => {
    return sequelize.define('log', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        logText: {
            type: DataTypes.STRING,
        }

    },
    )
}