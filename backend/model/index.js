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
db.iceCream = require("./iceCream")(sequelize, DataTypes);
db.order = require("./order")(sequelize, DataTypes);
db.orderItem = require("./orderItem")(sequelize, DataTypes);
db.role = require('./role')(sequelize, DataTypes)
db.accounts.belongsTo(db.role, { foreingKey: ["roleId"] })
db.customer.belongsTo(db.accounts, { foreingKey: ["accountId"] });
db.order.belongsTo(db.customer, { foreingKey: ['customerId'] });
db.orderItem.belongsTo(db.order, { foreingKey: ['id', "orderId"] })
db.order.belongsToMany(db.iceCream, { through: db.orderItem, foreingKey: ["iceCreamId"] });
db.iceCream.belongsToMany(db.order, { through: db.orderItem, foreingKey: ["iceCreamId"] })
// sequelize
//     .sync({ force: true })
//     .then(() => {
//         console.log("Table Altered");
//     })
//     .catch((err) => {
//         console.log("Error in table modification:", err);
//     });

module.exports = db;