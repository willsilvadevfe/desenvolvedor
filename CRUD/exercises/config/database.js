const { Sequelize } = require("sequelize");
const sequelize = new Sequelize.Sequelize(
    "escola",
    "postgres",
    "will8864",{
        host: "localhost",
        dialect: "postgres",
        port: 5432,
        logging: false
    }
);

module.exports = sequelize
