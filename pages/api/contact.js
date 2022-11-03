const pool = require('../../config/db');
const nodemailer = require('nodemailer');
require('dotenv').config();

export default async function handler(req, res) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    if (req.method == 'POST') {
        const { name, email, phone, message } = req.body;

        const mailoptions = {
            from: process.env.EMAIL_ADDRESS,
            to: process.env.EMAIL_ADDRESS,
            subject: "New contact form submission - CodingThunder",
            text: `Hey Admin!\nYou have a new contact message from ${name}\nDetails:\nName: ${name}\nEmail Address: ${email}\nPhone Number: ${phone}\nMessage: \n${name}`
        }

        if (name == "" || email == "" || phone == "" || message == "") {
            res.status(200).json({ status: "error", message: "Please fill up your contact details!" });
        } else {
            let saveContact = await pool.query(`INSERT INTO contacts (name, email, phone, message) VALUES ('${name}', '${email}', '${phone}', '${message}')`);
            transporter.sendMail(mailoptions, function (error, info) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Email sent: ' + info.response)
                }
            })
            if (saveContact) {
                res.status(200).json({ status: "success", message: "Contact message sent successfully!" });
            }
        }

    }
}