const Sequelize = require('sequelize')
const sequelize = require('../util/connection')
const helpers = require('../helpers/helpers')

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
Domain.afterCreate(async(domain, options) => {
    helpers.getAllDomains()
});

Domain.afterUpdate(async(domain, options) => {
    if (domain.isMonitoring == 1) {
        helpers.getAllDomains()
    }
});


module.exports = Domain;