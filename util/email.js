const nodemailer = require("nodemailer");
require("dotenv").config();


var transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

exports.send = (from, to, subject, text, html) => {

    transport.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html,
    });
}