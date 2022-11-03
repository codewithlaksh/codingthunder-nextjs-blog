const pool = require('../../config/db');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const { username, password } = req.body;
        
        let user = await pool.query(`SELECT * FROM users WHERE users.username='${username}'`);
        const bytes = CryptoJS.AES.decrypt(user.rows[0].password, "secret123");
        const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (user.rowCount == 1) {
            if (username == user.rows[0].username && password == decryptedPassword) {
                let token = jwt.sign({ status: "success", email: user.rows[0].email, name: user.rows[0].name, username: user.rows[0].username }, 'jwtsecret', {
                    expiresIn: '1d'
                })
                res.status(200).json({ status: "success", message: "You have been logged in successfully!", username: user.rows[0].username, token: token });
            } else {
                res.status(200).json({ status: "error", message: "Invalid password for the user!" });
            }
        } else {
            res.status(200).json({ status: "error", message: "No such user exists!" });
        }

    }
}