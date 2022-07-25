var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth')
const { body } = require('express-validator');
const User = require('../models/user');


router.post('/login',
    body('password').exists(),
    body('email').exists().isEmail(),
    authController.login);

router.get('/verify/:id', authController.verify);

router.post('/register',
    body('name').exists(),
    body('password').exists(),
    body('email').exists().isEmail()
    .custom(value => {
        return User.findOne({ where: { email: value } })
            .then((result) => {
                if (result)
                    return Promise.reject('Email already taken')
            })
    }), authController.register);

module.exports = router;