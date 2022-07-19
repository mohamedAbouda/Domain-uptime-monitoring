const sequelize = require('../util/connection')
const product = require('../models/product')
const user = require('../models/user')


exports.syncTables = () => {
    sequelize.sync()
}