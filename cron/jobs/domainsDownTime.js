const Domain = require('../../models/domain')
const axios = require('axios')
const email = require('../../util/email')
const User = require('../../models/user')
const moment = require('moment')
const DomainDownTime = require('../../models/DomainDownTime')



exports.monitoringDomainsDownTime = async() => {
    var domains = await Domain.findAll({ raw: true, include: User });
    domains.forEach(domain => {
        axios.get(domain.url)
            .then(res => {
                if (res.status == 200) {
                    domainIsUp(domain)
                } else {
                    domainIsDown(domain)
                }
            })
            .catch(err => {
                domainIsDown(domain)
            })
    });
}

async function domainIsDown(domain) {
    var [log, created] = await DomainDownTime.findOrCreate({
        where: { domainId: domain.id, recoveryTime: null },
        defaults: {
            domainId: domain.id,
            emailSent: 1
        }
    });
    if (created) {
        email.send('timeMonitor@mail.com', domain['user.email'], domain.url + ' is down')
    }

}

async function domainIsUp(domain) {
    var entry = await DomainDownTime.findOne({ where: { domain_id: domain.id, recovery_time: null } });
    if (entry) {
        entry.recoveryTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        entry.save();
        email.send('timeMonitor@mail.com', domain['user.email'], domain.url + ' is up')
    }
}