const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const transporter = nodemailer.createTransport({

  
   service:'gmail',
   secure: false,
   port: 25,
    auth: {
        user: 'aurensxyr1@gmail.com',
        pass: 'empylatex13'
    },

    tls: {
        rejectUnauthorized: false
    }

});

transporter.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./resources/mail/'),
    extName: '.html',
}));


module.exports = transporter;

