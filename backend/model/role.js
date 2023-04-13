module.exports = (sequelize, DataTypes) => {
    return sequelize.define('role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        roleName: {
            type: DataTypes.STRING,
            unique: true
        }
    },
        {
            timestamps: false
        }
    )
}