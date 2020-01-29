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
      return Tokens.findtoken(user_id)
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

function updateToken(
  newtoken,
  newExpiryTokenDate,
  newRefreshToken,
  newRefreshTokenExpiryDate,
  user_id
) {
  return Tokens.updateToken(
    newtoken,
    newExpiryTokenDate,
    newRefreshToken,
    newRefreshTokenExpiryDate,
    user_id
  )
    .then(data => {
      return "user was updates";
    })
    .catch(err => {
      throw "USER NOT FOUND";
    });
}

function deleteToken(id) {
  return Tokens.deleteToken(id)
    .then(data => {
      return " token was deleted successfully";
    })
    .catch(err => {
      throw "token NOT FOUND";
    });
}

module.exports.create = createToken;
module.exports.findRefreshToken = findRefreshToken;
module.exports.delete = deleteToken;
module.exports.update = updateToken;
