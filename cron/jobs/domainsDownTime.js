const Domain = require('../../models/domain')
const axios = require('axios')
const User = require('../../models/user')
const moment = require('moment')
const DomainDownTime = require('../../models/DomainDownTime')
const helpers = require('../../helpers/helpers')
require("dotenv").config()



exports.monitoringDomainsDownTime = async() => {
    var domains = JSON.parse(await redisClient.get('domains'))
    domains.forEach(domain => {
        axios.get(addhttp(domain.url))
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
        }
    });

    if (created) {
        helpers.sendingEmail({
                domainUrl: domain.url,
                userName: domain['user.name'],
            },
            'Your Domain is down', 'domain-down', domain['user.email']);
    }
}

async function domainIsUp(domain) {
    var entry = await DomainDownTime.findOne({ where: { domain_id: domain.id, recovery_time: null } });
    if (entry) {
        entry.recoveryTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        entry.save();
        helpers.sendingEmail({
                domainUrl: domain.url,
                userName: domain['user.name'],
                downTime: entry.downTime,
                recoveryTime: entry.recoveryTime
            },
            'Your Domain is up and running', 'domain-up', domain['user.email']);
    }
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}