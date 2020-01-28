var db = require("../db/db");
var users = require("./users.js");
const TokenSchema = `CREATE TABLE  IF NOT EXISTS tokens (
    id serial primary key not null,
    tokenValue varchar(255)  ,
    token_expires_at  timestamp with time zone default current_timestamp + interval '30' ,
    refresh_token varchar(255) ,
    refresh_token_expires_at timestamp with time zone default current_timestamp,
    user_id int 
   



);`;
// FOREIGN KEY (user_id) REFERENCES users(id)
db.query(TokenSchema, (err, data) => {
  if (err) {
    console.log(err);
  } else console.log("tokens table successfully created");
});
function getToken(user_id) {
  return db.query(`select tokenValue from tokens  where user_id = $1`, [
    user_id
  ]);
}
function createToken(
  tokenValue,
  token_expires_at,
  refresh_token,
  refresh_token_expires_at,
  user_id
) {
  return db.query(
    `INSERT into tokens(tokenValue,token_expires_at,refresh_token,refresh_token_expires_at,user_id) VALUES($1, $2 , $3, $4, $5)`,
    [
      tokenValue,
      token_expires_at,
      refresh_token,
      refresh_token_expires_at,
      user_id
    ]
  );
}
function getRefreshToken(refresh_token) {
  return db.query(`select * from tokens where refresh_token =$1 `, [
    refresh_token
  ]);
}
function updateToken(newtoken, newExpiryTokenDate, user_id) {
  return db.query(
    `update users set tokenValue = '${newtoken}' token_expires_at = '${newExpiryTokenDate}' where user_id = $1 `,
    [user_id]
  );
}
function deleteToken(id) {
  return db.query(`DELETE FROM tokens WHERE user_id =  '${id}'`);
}
module.exports.create = createToken;

module.exports.findtoken = getToken;
module.exports.findRefreshToken = getRefreshToken;

module.exports.updateToken = updateToken;
module.exports.deleteToken = deleteToken;
