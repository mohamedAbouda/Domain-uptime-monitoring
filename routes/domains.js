var express = require('express');
var router = express.Router();
const DomainController = require('../controllers/domain')
const { body, query } = require('express-validator');
const Domain = require('../models/domain');



router.get('/', DomainController.list);

router.post('/store',
    body('name').exists(),
    body('url').exists().isURL()
    .custom(value => {
        return Domain.findOne({ where: { url: value } })
            .then((result) => {
                if (result)
                    return Promise.reject('URL already taken')
            })
    }),
    DomainController.create);

router.post('/delete',
    body('domain_id').exists(),
    DomainController.delete);

router.get('/show',
    query('domain_id').exists(),
    DomainController.show);

router.get('/down-time', DomainController.downTime);

router.post('/update',
    body('domain_id').exists(),
    body('name').exists(),
    body('url').exists().isURL(),
    DomainController.update);

router.post('/change/domain/monitoring-state',
    body('domain_id').exists(),
    body('monitoring_state').exists().isIn([0, 1]),
    DomainController.updateMonitoringState);

module.exports = router;