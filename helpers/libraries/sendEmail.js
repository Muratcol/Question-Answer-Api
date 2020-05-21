const nodemailer = require('nodemailer');

const sendEmail = async(mailOptions) => {
    let transporter = nodemailer.createTransport({
        host : process.env.SMTP_HOST,
        port : process.env.SMTP_PORT,
        auth : {
            user: process.env.DB_USER, // Your gmail username
            pass: process.env.DB_PASS // password
        }
    });

    let info = await transporter.sendMail(mailOptions);
    console.log(`Message sent: ${info.messageId}`)
};

module.exports = sendEmail;
