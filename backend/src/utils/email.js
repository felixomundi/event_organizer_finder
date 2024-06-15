require("dotenv").config();
const nodemailer = require("nodemailer");
// Import NodeMailer (after npm install)

async function mail(sent_to_email, subject, message) {
// Async function enables allows handling of promises with await

  // First, define send settings by creating a new transporter: 
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, // SMTP server address (usually mail.your-domain.com)
    port: 587, // Port for SMTP (usually 465)
    secure:  false, // Usually true if connecting to port 465
    auth: {
      user: process.env.MAIL_USERNAME, // Your email address
      pass: process.env.MAIL_PASSWORD, // Password (for gmail, your app password)
      // ⚠️ For better security, use environment variables set on the server for these values when deploying
    },
    tls: {
      rejectUnauthorized: false,
    },
    // connectionTimeout: 10000, 
  });
  
  // Define and send message inside transporter.sendEmail() and await info about send from promise:
  // let info =
    await transporter.sendMail({
    from: process.env.MAIL_FROM_ADDRESS,
    to: sent_to_email,
    subject: subject,
    html: message,
  });

//  console.log(info.messageId); // Random ID generated after successful send (optional)
}

module.exports = {mail};
