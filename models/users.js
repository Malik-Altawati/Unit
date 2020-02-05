const conn = require("../db/db");

//User Schema
const userSchema = `CREATE TABLE IF NOT EXISTS users (
    id serial primary key,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    photo varchar(255),
    password VARCHAR(255) not null ,
    age VARCHAR(255) ,
    gender VARCHAR(7),
    bio VARCHAR(255)
    );`;

conn.query(userSchema, (err, data) => {
  if (err) console.error(err);
  else console.log("users table is working");
});

//User functionality

function getUser(email) {
  return conn.query(`SELECT * FROM users WHERE email = $1`, [email]);
}
function findById(id) {
  return conn.query(`SELECT * FROM users WHERE id = $1 `, [id]);
}
function createUser(name, username, email, password) {
  return conn.query(
    `INSERT into users(name, username, email, password , photo, gender) VALUES($1, $2 , $3, $4, $5, $6)`,
    [name, username, email, password, "newUser.jpg", "-"]
  );
}

function deleteUser(id) {
  return conn.query(`DELETE FROM users WHERE id =  '${id}'`);
}
// malik's
function updateUser(user_id, password) {
  return conn.query(
    `UPDATE users SET password ='${password}' WHERE id = '${user_id}'`
  );
}
function getUserByUsername(username) {
  return conn.query(`SELECT * FROM users WHERE username = $1`, [username]);
}
function getAllUsers() {
  return conn.query(`SELECT * FROM users`);
}
function updatePhoto(user_id, photo) {
  console.log(user_id, photo);
  return conn.query(
    `UPDATE users SET photo ='${photo}' WHERE id = '${user_id}'`
  );
}

function updateProfile(user_id, name, username, age, gender, bio) {
  return conn.query(
    `UPDATE users SET name ='${name}', username = '${username}', age = '${age}', gender = '${gender}', bio = '${bio}' WHERE id = '${user_id}'`
  );
}
//

module.exports.findById = findById;
module.exports.find = getUser;

module.exports.create = createUser;
module.exports.delete = deleteUser;
module.exports.update = updateUser;

module.exports.getByUsername = getUserByUsername;
module.exports.getUsers = getAllUsers;
module.exports.updatePhoto = updatePhoto;
module.exports.updateProfile = updateProfile;
