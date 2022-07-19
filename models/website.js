const Sequelize = require('sequelize')

const sequelize = require('../util/connection')

const Website = sequelize.define('website', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Website;