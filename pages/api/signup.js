const pool = require('../../config/db');
const CryptoJS = require("crypto-js");

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const { name, email, username, password1, password2 } = req.body;
        // console.log(req.body)

        let userExists = await pool.query(`SELECT * FROM users WHERE users.username='${username}'`);

        if (name == "" || email == "" || username == "" || password1 == "" || password2 == "") {
            res.status(200).json({ status: "error", message: "Please fill up your signup credentials!" });
        } else if (username.length < 6 || username.length > 12) {
            res.status(200).json({ status: "error", message: "Username must have atleast 6 and atmost 12 characters!" });
        } else if (userExists.rowCount == 1) {
            res.status(200).json({ status: "error", message: "This username has been already taken!" });
        } else {
            let createUser = await pool.query(`INSERT INTO users (username, name, email, password) VALUES ('${username}', '${name}', '${email}', '${CryptoJS.AES.encrypt(password1, "secret123").toString()}')`);
            if (createUser) {
                res.status(200).json({ status: "success", message: "Account created successfully!" });
            }
        }

    }
}