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
      
      let email = require('./email.html')
      console.log('this is email', email);
      


      let mailOptions = {
        from: process.env.GMAIL,
        to: 'redlake287@gmail.com',
        subject: 'Forgot your password?',
        html: email
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('Error occurred: ', error);
          return;
        } else {
          console.log('Email sent: ' + info.response);
          return;
        }
      });
}
