const nodemailer = require("nodemailer");

// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "jingarjyoti9413@gmail.com",
        pass: "qosjdxfckpjjqrgt",
    },
});


async function sendMailer(to,subject,html) {
    await transporter.sendMail({
        from: "jingarjyoti9413@gmail.com",
        to,
        subject,
        html
    })
}

module.exports = sendMailer