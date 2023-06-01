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
            defauldValue: ""
        },
        contact: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            defauldValue: null
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