var nodemailer = require('nodemailer');
var fs=require('fs');

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

// module.exports = sentEmail = () => {
//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.GMAIL,
//       pass: process.env.GMAIL_PASSWORD
//     }
//   });

//   const email = require("./email.html");

//   let mailOptions = {
//     from: process.env.GMAIL,
//     to: "klin18@apu.edu",
//     subject: "Forgot your password?",
//     html: email
//   };

//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       console.log("Error occurred: ", error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// },

module.exports = resetPassword = async (req, res) => {
  if(!req || !req.body)
    throw new Error ("No parameter was met");

  const email = req.body.email;
  const isEmailSent = req.body.isEmailSent;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  User.findOne({ email: email }, (err, foundObject) => {
    const isEqual = bcrypt.compare(foundObject.password, oldPassword);
    if(!isEqual)
      throw new Error("Incorrect password!");
    foundObject.password = hashedPassword;
    
    foundObject.save((err, updateObject) => {
      if(err) {
        res.status(500).send() 
      }
      else {
        res.send(updateObject);
      }
    });
  });
}
