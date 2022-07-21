const Sequelize = require('sequelize')

const sequelize = require('../util/connection')

const Domain = sequelize.define('domain', {
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
    isMonitoring: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
    },
});

module.exports = Domain;