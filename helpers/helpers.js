const crypto = require('crypto');

exports.showValidationErrors = (res, errors) => {
    return res.status(422).json({
        error: errors.array()[0].param + " : " + errors.array()[0].msg,
        status: 422
    });
}

exports.sendingEmail = (context, subject, template, userEmail) => {
    email.sendMail({
        from: process.env.FROM_EMAIL,
        to: userEmail,
        subject: subject,
        template: template,
        context: context,
    });
}

exports.hashString = (str, type = 'md5') => {
    return crypto.createHash(type).update(str).digest('hex');
}