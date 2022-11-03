const pool = require('../../config/db')

export default async function handler(req, res) {
    if (req.method == "POST") {
        const { post, parent, user, comment } = req.body;
        if (parent == '') {
            let saveComment = await pool.query(`INSERT INTO comments (post, username, comment_desc) VALUES (${post}, '${user}', '${comment}')`);
            const comments = await pool.query(`SELECT * FROM comments WHERE post='${post}' ORDER BY comments.timestamp ASC`);
            if (saveComment) {
                res.status(200).json({ status: "success", message: "Your comment has been posted successfully!", comments: comments.rows });
            }
        } else {
            let saveComment = await pool.query(`INSERT INTO comments (post, parent, username, comment_desc) VALUES (${post}, ${parseInt(parent)}, '${user}', '${comment}')`);
            const comments = await pool.query(`SELECT * FROM comments WHERE post='${post}' ORDER BY comments.timestamp ASC`);
            if (saveComment) {
                res.status(200).json({ status: "success", message: "Your reply has been posted successfully!", comments: comments.rows });
            }
        }
    }
}