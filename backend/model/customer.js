module.exports = (sequelize, DataTypes) => {
    return sequelize.define('customer', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        fullname: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        contact: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accountId: {
            type: DataTypes.INTEGER,
        }
    },
        {
            timestamps: false
        }
    )
}