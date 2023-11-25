const PASSWORD = process.env["PASSWORD"];
const EMAIL = process.env["EMAIL"];
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    },
});

function createMailOptions(userEmail, token){
    return {
        from: EMAIL,
        to: userEmail,
        subject: 'Verify account',
        text: `http://localhost:3000/api/users/verify/${token}`,
    };

}

module.exports = {
    transporter,
    createMailOptions
}