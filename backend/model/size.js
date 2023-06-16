module.exports = (sequelize, DataTypes) => {
    return sequelize.define('size', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        size: {
            type: DataTypes.STRING,
        }
    },
        {
            timestamps: false
        }
    )
}