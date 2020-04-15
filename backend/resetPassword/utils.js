var nodemailer = require("nodemailer");
const User = require("../models/user");
var fs = require("fs");
const bcrypt = require("bcrypt");

require.extensions[".html"] = function(module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

module.exports = {
  sentEmail: async args => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD
      }
    });
  
    const email = require("./email.html");
  
    let mailOptions = {
      from: process.env.GMAIL,
      to: "klin18@apu.edu",
      subject: "Forgot your password?",
      html: email
    };
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log("Error occurred: ", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },

};

module.exports = resetPassword = async (req, res) => {
  console.log(req.body);
  
  if(!req || !req.body)
    throw new Error ("No parameter was met");


  
  const email = req.body.email;
  const newPassword = req.body.newPassword;
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  User.findOne({ email: email }, (err, foundObject) => {
    foundObject.password = hashedPassword;
    console.log(foundObject);
    
    foundObject.save();
  });
}
