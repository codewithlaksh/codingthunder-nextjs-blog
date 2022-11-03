const pool = require('../../config/db');

export default async function handler(req, res) {
    if (req.query.search_query === undefined) {
        const blogs = await pool.query('SELECT * FROM blogs ORDER BY blogs.timestamp ASC');
        res.status(200).json({ status: 200, length: blogs.rowCount, blogs: blogs.rows });
    } else {
        const blogs = await pool.query(`SELECT * FROM blogs WHERE to_tsvector(title) @@ to_tsquery('${req.query.search_query}') ORDER BY blogs.timestamp ASC`);
        res.status(200).json({ status: 200, length: blogs.rowCount, blogs: blogs.rows });
    }
}