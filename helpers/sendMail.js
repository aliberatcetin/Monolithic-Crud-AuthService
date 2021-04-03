const settings = require('../config/settings')
const nodemailer = require('nodemailer');

function notifyNewQuestion(){
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: settings.notificationMail,
            pass: settings.notificationMailPass
        }
    });
    var mailOptions = {
        from: settings.notificationMail,
        to: settings.notificationMail,
        subject: 'new question',
        text: 'new question'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


module.exports = {
    notifyNewQuestion
}
