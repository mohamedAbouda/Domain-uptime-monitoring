const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helpers = require('../helpers/helpers')
const { validationResult } = require('express-validator');

require("dotenv").config();

exports.login = async(req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return helpers.showValidationErrors(res, errors)
    }
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            if (user.isVerified != 1) {
                return res.status(400).send("Please verify your email first");
            }
            const token = jwt.sign({ user_id: user._id, email },
                process.env.TOKEN_KEY, {
                    expiresIn: "168h",
                }
            );

            user.token = token;
            user.save();

            return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
}

exports.register = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return helpers.showValidationErrors(res, errors)
    }

    try {
        const { name, email, password } = req.body;

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email: email,
            password: encryptedPassword,
        });

        user.verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        user.save();
        helpers.sendingEmail({
                verificationUrl: 'http://localhost:3000/api/auth/verify/' + user.verificationToken,
                userName: user.name,
            },
            'Email Verification', 'verify-email', user.email);
        res.status(201).send('Please , verify your email first')
            // res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
}

exports.verify = async(req, res, next) => {
    var user = await User.findOne({ where: { verificationToken: req.params.id } });
    if (!user) {
        return res.status(404).send("can't find your data");
    }
    if (user.verificationToken == 1) {
        return res.status(200).send("Your email is already verified");
    }
    user.isVerified = 1
    user.save();
    res.send('Email verified')
}