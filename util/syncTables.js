const sequelize = require('../util/connection')
const Domain = require('../models/domain')
const User = require('../models/user');
const DomainDownTime = require('../models/DomainDownTime');
require("dotenv").config();



exports.syncTables = () => {

    Domain.belongsTo(User, {
        constraints: true,
        onDelete: 'CASCADE'
    });

    User.hasMany(Domain);
    Domain.hasMany(DomainDownTime);

    sequelize.sync({ force: !!+(process.env.DB_SYNC) })
}