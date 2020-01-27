const conn = require("../db/db");
const users = require("./users.js");

//posts Schema
const postsSchema = `CREATE TABLE IF NOT EXISTS posts (
    id int not null primary key,
    post VARCHAR(255),
    link VARCHAR(255),
    created_at DATE,
    user_id int,
    FOREIGN KEY (user_id) REFERENCES users(id)
    );`

conn.query(postsSchema, (err, data) => {
    if (err) console.error(err);
    else console.log("posts table is working")
})

//posts functionality

function getposts(user_id) {
    return conn.query(`SELECT * FROM posts WHERE user_id = $1`, [user_id])
}


function createpost(post, link, user_id) {
    return conn.query(`INSERT into posts(post, link, user_id) VALUES($1, $2, $3)`, [post, link, user_id])
}


function deletepost(id, user_id) {
    return conn.query(`DELETE FROM posts WHERE id =  '${id}' AND user_id = '${user_id}'`)
}

function updatepost(post, id, user_id) {
    return conn.query(`UPDATE posts SET post ='${post}' WHERE id = '${id}' AND user_id = '${user_id}'`)
}
module.exports.find = getposts;
module.exports.create = createpost;
module.exports.delete = deletepost;
module.exports.update = updatepost;