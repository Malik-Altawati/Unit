var db = require("../db/db");
var users = require("./users.js");
const TokenSchema = `CREATE TABLE  IF NOT EXISTS tokens (
    id serial primary key not null,
    tokenValue varchar(255)  ,
    token_expires_at  date ,
    refresh_token varchar(255) ,
    refresh_token_expires_at date,
    FOREIGN KEY (user_id) REFERENCES users(id)



);`;
db.query(TokenSchema, (err, data) => {
  if (err) {
    console.log(err);
  } else console.log("tokens table successfully created");
});
function getToken(user_id) {
  return db.query(`select tokenVaule from tokens  where user_id = $1`, [
    user_id
  ]);
}
function getRefreshToken(user_id) {
  return db.query(`select refresh_token from tokens where user_id =$1 `, [
    user_id
  ]);
}
function updateToken(newtoken, newExpiryTokenDate, user_id) {
  return db.query(
    `update users set tokenValue = '${newtoken}' token_expires_at = '${newExpiryTokenDate} where user_id = $1 `,
    [user_id]
  );
}
function deleteToken(id) {
  return db.query(`DELETE FROM tokens WHERE user_id =  '${id}'`);
}
module.exports.findToken = getToken;
module.exports.getRefreshToken = getRefreshToken;
module.exports.updateToken = updateToken;
module.exports.deleteToken = deleteToken;
