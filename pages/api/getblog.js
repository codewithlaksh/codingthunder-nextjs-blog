const pool = require('../../config/db');

export default async function handler(req, res) {
    const blog = await pool.query(`SELECT * FROM blogs WHERE slug='${req.query.slug}'`);
    if (blog.rowCount === 0) {
        res.status(404).json({ status: 404, message: 'No such blog was found!' });
    } else {
        res.status(200).json({ status: 200, blog: blog.rows })
    }
}