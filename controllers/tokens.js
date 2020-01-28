const Tokens = require("../models/token");
function createToken(
  token,
  expiresIn,
  refreshToken,
  refreshTokenExpiresIn,
  user_id
) {
  return Tokens.create(
    token,
    expiresIn,
    refreshToken,
    refreshTokenExpiresIn,
    user_id
  )
    .then(data => {
      console.log(data);
      return Tokens.find(user_id)
        .then(data => {
          return data.rows[0];
        })
        .catch(err => {
          throw "no token found";
        });
    })
    .catch(err => {
      console.log(err);
    });
}

function findRefreshToken(refresh_token) {
  return Tokens.findRefreshToken(refresh_token)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      throw "refresh token not Found";
    });
}

function updateUser(user, pass) {
  return User.update(user, pass)
    .then(data => {
      return "user was updates";
    })
    .catch(err => {
      throw "USER NOT FOUND";
    });
}

function deleteUser(user) {
  return User.delete(user)
    .then(data => {
      return " user was deleted";
    })
    .catch(err => {
      throw "USER NOT FOUND";
    });
}

module.exports.create = createToken;
module.exports.findRefreshToken = findRefreshToken;
module.exports.delete = deleteUser;
module.exports.update = updateUser;
