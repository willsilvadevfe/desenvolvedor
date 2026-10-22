const { Sequelize } = require("sequelize");
const sequelize = new Sequelize.Sequelize(
    "produtos",
    "postgres",
    "will8864",{
        host: "localhost",
        dialect: "postgres",
        port: 5432
    }
)

module.exports = sequelize
