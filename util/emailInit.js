const nodemailer = require("nodemailer");
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
var siteStatusTemplate = path.join(__dirname, '../views/emails')

require("dotenv").config();

exports.initialize = () => {
    global.email = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const handlebarsOptions = {
        viewEngine: {
            extName: ".html",
            partialsDir: path.resolve(siteStatusTemplate),
            defaultLayout: false,
        },
        viewPath: path.resolve(siteStatusTemplate),
        extName: ".html"
    }
    email.use('compile', hbs(handlebarsOptions))
}