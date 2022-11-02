const nodemailer = require("nodemailer");

exports.email = async (body) => {
  let mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  var mailOptions = {
    from: process.env.EMAIL_USER,
    to: body.email,
    subject: body.subject,
    text: JSON.stringify(body.text),
  };

  await mail.sendMail(mailOptions);

};

