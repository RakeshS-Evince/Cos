module.exports = (sequelize, DataTypes) => {
    return sequelize.define('staff', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        fullname: {
            type: DataTypes.STRING,
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