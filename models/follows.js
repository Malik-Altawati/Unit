const conn = require("../db/db");

//User Schema
const followsSchema = `CREATE TABLE IF NOT EXISTS follows (
    id serial primary key,
    follower_id VARCHAR(255) ,
    followed_id VARCHAR(255)
    );`

conn.query(followsSchema, (err, data) => {
    if (err) console.error(err);
    else console.log("follows table is working")
})

//User functionality

function getfollowers(followed_id) {
    return conn.query(`SELECT * FROM follows WHERE followed_id = $1`, [followed_id])
}


function follow(follower_id, followed_id) {
    return conn.query(`INSERT into follows(follower_id, followed_id) VALUES($1, $2)`, [follower_id, followed_id])
}


function unfollow(follower_id, followed_id) {

    return conn.query(`DELETE FROM follows WHERE follower_id =  '${follower_id}' AND followed_id =  '${followed_id}'`)
}


module.exports.getfollowres = getfollowers;
module.exports.follow = follow;
module.exports.unfollow = unfollow;
