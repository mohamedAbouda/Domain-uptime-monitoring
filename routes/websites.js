var express = require('express');
var router = express.Router();
const websiteController = require('../controllers/website')
const { body, query } = require('express-validator');
const Website = require('../models/website');



router.get('/', websiteController.list);

router.post('/store',
    body('name').exists(),
    body('url').exists().isURL()
    .custom(value => {
        return Website.findOne({ where: { url: value } })
            .then((result) => {
                if (result)
                    return Promise.reject('URL already taken')
            })
    }),
    websiteController.create);

router.post('/delete',
    body('domain_id').exists(),
    websiteController.delete);

router.get('/show',
    query('domain_id').exists(),
    websiteController.show);

router.post('/update',
    body('domain_id').exists(),
    body('name').exists(),
    body('url').exists().isURL(),
    websiteController.update);

module.exports = router;