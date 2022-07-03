const sequelize = require('../util/connection')
const product = require('../models/product')


exports.syncTables = () => {
    sequelize.sync()
}