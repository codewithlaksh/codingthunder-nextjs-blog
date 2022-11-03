const pool = require('../../config/db')

export default async function handler(req, res) {
    const comments = await pool.query(`SELECT * FROM comments WHERE post='${req.query.postSno}' ORDER BY comments.timestamp ASC`);
    res.status(200).json({ status: 200, comments: comments.rows })
}