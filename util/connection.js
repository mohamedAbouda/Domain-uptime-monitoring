const Sequelize = require('sequelize')
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION,
        logging: !!+(process.env.DB_LOGGING),
        define: {
            underscored: true
        }
    });


module.exports = sequelize;