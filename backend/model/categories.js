module.exports = (sequelize, DataTypes) => {
    return sequelize.define('categories', {
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