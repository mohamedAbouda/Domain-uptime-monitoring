const jwt = require('jsonwebtoken');
const User = require('../models/user');
require("dotenv").config();


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        User.findOne({ where: { email: user.email } }).then(result => {
            req.user = result
            next()
        });

    })
}
module.exports = authenticateToken;