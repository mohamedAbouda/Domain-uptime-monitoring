const sequelize = require('../util/connection')
const Website = require('../models/website')
const User = require('../models/user')
require("dotenv").config();



exports.syncTables = () => {

    Website.belongsTo(User, {
        constraints: true,
        onDelete: 'CASCADE'
    });

    User.hasMany(Website);

    sequelize.sync({ force: !!+(process.env.DB_SYNC) })
}