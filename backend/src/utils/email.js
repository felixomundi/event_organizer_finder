"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "mail.nyagaka.com",
    port: 587,
    // secure: false,
    auth: {    
      user: "contact@nyagaka.com",
      pass: "omundi2030",
    },
    tls: {
        rejectUnauthorized:false,
    },
});
  
async function sendEmails(name,email,subject,message) {
   try {
     await transporter.sendMail({
        from: `${name} ${email}`, 
        to: "contact@nyagaka.com", 
        subject: subject,        
        html: message, 
      });       
          
   } catch (error) {
       
   }
  
}
  
module.exports = {
    sendEmails

}

