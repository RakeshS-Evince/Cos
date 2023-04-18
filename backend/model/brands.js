module.exports = (sequelize, DataTypes) => {
    return sequelize.define('brand', {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
        }
    },
        {
            timestamps: false
        }
    )
}