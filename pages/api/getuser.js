const jwt = require('jsonwebtoken');

export default function handler(req, res) {
    if (req.method == 'POST') {
        const { token } = req.body;
        let user = jwt.verify(token, 'jwtsecret');
        res.status(200).json({ username: user.username })
    }
}