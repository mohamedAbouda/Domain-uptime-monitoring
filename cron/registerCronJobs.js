const cron = require('node-cron')

const domainDownTimeJob = require('./jobs/domainsDownTime')
exports.registerCronJobs = () => {

    cron.schedule('*/5 * * * * *', () => {
        domainDownTimeJob.monitoringDomainsDownTime()
    });
};