const Domain = require('../models/domain')
const DomainDownTime = require('../models/DomainDownTime')
const { validationResult } = require('express-validator');
const helpers = require('../helpers/helpers')

exports.list = async(req, res, next) => {

    const Domains = await req.user.getDomains();
    return res.status(200).json({
        'data': Domains,
        'status': 200
    });
}

exports.show = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return helpers.showValidationErrors(res, errors)
    }

    var domain_id = req.query.domain_id;
    Domain.findByPk(domain_id).then(result => {
            if (!result) {
                return res.status(404).json({
                    'error': 'Can not find domain with this ID',
                    'status': 404
                });
            }
            return res.status(200).json({
                'data': result,
                'status': 200
            });
        })
        .catch(err => {
            return res.json({
                'error': err,
            });
        })

}

exports.update = async(req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return helpers.showValidationErrors(res, errors)
    }

    var domain = await Domain.findByPk(req.body.domain_id);
    if (!domain) {
        return res.status(404).json({
            'error': 'Can not find domain with this ID',
            'status': 404
        });
    }
    domain.update({
        name: req.body.name,
        url: req.body.url
    });
    return res.status(200).json({
        'message': 'domain has been updated',
        'status': 200
    });

}

exports.create = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return helpers.showValidationErrors(res, errors)
    }

    Domain.create({
        name: req.body.name,
        url: req.body.url,
        userId: req.user.id
    }).then(result => {
        return res.status(200).json({
            'message': 'domain has been created',
            'status': 200
        });
    }).catch(err => {
        return res.json({
            'error': err,
        });
    })
}

exports.delete = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return helpers.showValidationErrors(res, errors)
    }

    var domain_id = req.body.domain_id;

    Domain.findByPk(domain_id).then(result => {
            if (!result) {
                return res.status(404).json({
                    'error': 'Can not find domain with this ID',
                    'status': 404
                });
            }
            result.destroy();
            return res.status(200).json({
                'message': 'domain has been deleted',
                'status': 200
            });
        })
        .catch(err => {
            return res.json({
                'error': err,
            });
        })
}

exports.downTime = async(req, res, next) => {
    var domainsDownTime = await DomainDownTime.findAll({
        where: {
            '$domain.user_id$': req.user.id
        },
        include: [{
            model: Domain,
        }]
    })

    return res.status(200).json({
        'data': domainsDownTime,
        'status': 200
    });
}

exports.updateMonitoringState = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return helpers.showValidationErrors(res, errors)
    }

    var domain = await Domain.findByPk(req.body.domain_id);
    if (!domain) {
        return res.status(404).json({
            'error': 'Can not find domain with this ID',
            'status': 404
        });
    }
    domain.update({
        isMonitoring: req.body.monitoring_state,
    });
    return res.status(200).json({
        'message': 'domain monitoring state has been updated',
        'status': 200
    });
}