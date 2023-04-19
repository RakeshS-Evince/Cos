require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
    }
);

sequelize
    .authenticate()
    .then(() => console.log("Database connection successful"))
    .catch(e => console.log("Some error in DB connection", e))

const db = {};
db.sequelize = sequelize;
db.accounts = require("./accounts")(sequelize, DataTypes);
db.customer = require("./customer")(sequelize, DataTypes);
db.address = require("./address")(sequelize, DataTypes);
db.staff = require("./staff")(sequelize, DataTypes);
db.iceCream = require("./iceCream")(sequelize, DataTypes);
db.brands = require("./brands")(sequelize, DataTypes);
db.cart = require("./cart")(sequelize, DataTypes);
db.order = require("./order")(sequelize, DataTypes);
db.orderItem = require("./orderItem")(sequelize, DataTypes);
db.role = require('./role')(sequelize, DataTypes)
db.accounts.belongsTo(db.role, {
    foreingKey: ["roleId"],
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
})
db.customer.belongsTo(db.accounts, {
    foreingKey: ["accountId"],
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
});
db.staff.belongsTo(db.accounts, {
    foreingKey: ["accountId"],
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
});
db.order.belongsTo(db.customer, {
    foreingKey: ['customerId'],
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
});
db.orderItem.belongsTo(db.order, { foreingKey: ['id', "orderId"] })
db.orderItem.belongsTo(db.order, { foreingKey: ['id', "orderId"] })
db.order.hasMany(db.orderItem, { foreingKey: ['id', "orderId"] })
db.order.belongsToMany(db.iceCream, {
    through: db.orderItem,
    foreingKey: ["iceCreamId"],
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
});
db.iceCream.belongsToMany(db.order, {
    through: db.orderItem,
    foreingKey: ["iceCreamId"],
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
});
db.customer.hasOne(db.cart, {
    foreingKey: ["id", 'customerId'],
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
});

db.cart.belongsTo(db.customer, {
    foreingKey: ["id", 'customerId'],
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
});
db.iceCream.belongsTo(db.brands, {
    foreingKey: ['name', 'brandName'], onUpdate: "CASCADE",
    onDelete: "SET NULL"
});
db.address.belongsTo(db.customer, {
    foreingKey: ["id", 'customerId'], onUpdate: "CASCADE",
    onDelete: "CASCADE"
})
// sequelize
//     .sync({ alter: true })
//     .then(() => {
//         console.log("Table Altered");
//     })
//     .catch((err) => {
//         console.log("Error in table modification:", err);
//     });

module.exports = { db, sequelize };