"use-strict"

const { sendEmails } = require("./../utils/email");
async function contactUs(req,res) {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                message:"Required fields are missing"
            })
        }
        let html = `
        <p>${message}</p>
        `
         await sendEmails(name, email, subject, html);
        return res.status(200).json({
            message:"Email sent successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message:"Email not sent try again"
        })
    }
} 
module.exports = {
    contactUs
}