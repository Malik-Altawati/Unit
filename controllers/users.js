const User = require("../models/users");
//const tokens = require("../models/token");

function createUser(userObj) {
  var email = userObj.email;
  var username = userObj.username;
  var password = userObj.password;
  var confirmPassword = userObj.confirmPassword;
  return User.create(username, email, password)
    .then(data => {
      return User.find(email)
        .then(data => {
          return data.rows[0];
        })
        .catch(err => {
          throw "user not Found";
        });
    })
    .catch(err => {
      throw "user exists";
    });
}

function findUser(email) {
  return User.find(email)
    .then(data => {
      return data;
    })
    .catch(err => {
      throw "user not Found";
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

module.exports.create = createUser;
module.exports.find = findUser;
module.exports.delete = deleteUser;
module.exports.update = updateUser;
