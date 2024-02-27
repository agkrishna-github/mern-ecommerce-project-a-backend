const nodemailer = require("nodemailer");

const Email = (options) => {
  console.log(options);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

const EmailSender = ({ name, email, mobile, comment }) => {
  console.log({ name, email, mobile, comment });
  const options = {
    from: "Krish Cart",
    to: process.env.SEND_TO,
    subject: "Message From Krish Cart",
    html: `
        <p>Full Name : ${name}</p>
        <p>Email : ${email}</p>
        <p>Mobile : ${mobile}</p>
        <p>Comment : ${comment}</p>
      `,
  };
  Email(options);
};

module.exports = { EmailSender };
