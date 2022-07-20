const Sequelize = require('sequelize')

const sequelize = require('../util/connection')

const DomainDownTime = sequelize.define('domain_down_time', {
    downTime: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    recoveryTime: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
    },
}, {
    timestamps: false,
});
DomainDownTime.removeAttribute('id');
module.exports = DomainDownTime;