const Website = require('../../models/website')
const axios = require('axios')
const email = require('../../util/email')
const User = require('../../models/user')



exports.monitoringDomainsDownTime = async() => {
    var domains = await Website.findAll({ raw: true, include: User });
    domains.forEach(domain => {
        axios.get(domain.url)
            .then(res => {
                if (res.status != 200)
                    sendDownTimeEmail(domain)

            })
            .catch(err => {
                sendDownTimeEmail(domain)
            })
    });
}

function sendDownTimeEmail(domain) {
    email.send('timeMonitor@mail.com', domain['user.email'], domain.url + ' is down')
}