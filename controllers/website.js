const Website = require('../models/website')
const { validationResult } = require('express-validator');
const helpers = require('../helpers/helpers')

exports.list = async(req, res, next) => {

    const websites = await req.user.getWebsites();
    return res.status(200).json({
        'data': websites,
        'status': 200
    });
}

exports.show = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return helpers.showValidationErrors(res, errors)
    }

    var domain_id = req.query.domain_id;
    Website.findByPk(domain_id).then(result => {
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

    var website = await Website.findByPk(req.body.domain_id);
    website.update({
        name: req.body.name,
        url: req.body.url
    });
    return res.status(200).json({
        'message': 'Website has been updated',
        'status': 200
    });

}

exports.create = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return helpers.showValidationErrors(res, errors)
    }

    Website.create({
        name: req.body.name,
        url: req.body.url,
        userId: req.user.id
    }).then(result => {
        return res.status(200).json({
            'message': 'Website has been created',
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

    Website.findByPk(domain_id).then(result => {
            if (!result) {
                return res.status(404).json({
                    'error': 'Can not find domain with this ID',
                    'status': 404
                });
            }
            result.destroy();
            return res.status(200).json({
                'message': 'Website has been deleted',
                'status': 200
            });
        })
        .catch(err => {
            return res.json({
                'error': err,
            });
        })
}