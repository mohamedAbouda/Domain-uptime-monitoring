const helpers = require('../helpers/helpers')
const sync = require('../util/syncTables')
const registerCronJobs = require('../cron/registerCronJobs')
const nodemailer = require('../util/emailInit')
const redis = require('../util/redisInit')

exports.initializeServices = async() => {
    sync.syncTables()
    registerCronJobs.registerCronJobs();
    nodemailer.initialize()
    redis.initialize()
    helpers.getAllDomains()
}