var express = require('express');
var router = express.Router();
const websiteController = require('../controllers/website')


router.get('/', websiteController.list);

router.post('/create', websiteController.create);

router.post('/delete', websiteController.delete);

router.get('/show', websiteController.show);

router.post('/update', websiteController.update);

module.exports = router;