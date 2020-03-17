var nodemailer = require('nodemailer');
var fs=require('fs');

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

module.exports = async function sentEmail() {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL,
          pass: process.env.GMAIL_PASSWORD
        }
      });
      
      const email = require('./email.html')

      let mailOptions = {
        from: process.env.GMAIL,
        to: 'redlake287@gmail.com',
        subject: 'Forgot your password?',
        html: email
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('Error occurred: ', error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
