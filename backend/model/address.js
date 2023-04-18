module.exports = (sequelize, DataTypes) => {
    return sequelize.define('address', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING,
        },
        lastname: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        house: {
            type: DataTypes.STRING,
        },
        zip: {
            type: DataTypes.STRING,
        },
        default: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
        {
            timestamps: false
        }
    )
}