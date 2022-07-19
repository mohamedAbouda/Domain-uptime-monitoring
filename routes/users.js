var express = require('express');
var router = express.Router();
const userController = require('../controllers/user')


router.get('/current', userController.getUser);

module.exports = router;