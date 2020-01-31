const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randToken = require("rand-token");

const User = require("./../../../controllers/users");
const Token = require("./../../../controllers/tokens");
const regiteryValidation = require("./../../validation/registryValidation");
const loginValidation = require("./../../validation/loginValidation");

///////////////////////////////////////////////////////////////////////////////////// SIGN UP SECTION
var refreshTokenYolo;
function signUp(req, res) {
  let { errors, isValid } = regiteryValidation(req.body);
  if (!isValid) {
    // console.log("not valid");
    // console.log(errors);
    res.status(200).json(errors);
  } else {
    // console.log("is valid");
    var { username, email, password, ConfirmPassword } = req.body;
    User.find(email)
      .then(data => {
        //console.log(data);
        if (data.rows.length > 0) {
          res
            .status(200)
            .json({ message: "user already exists", success: false });
        } else {
          //if no user with this email we will hash the password,save the
          //user data in the database and generate the authentication token
          var password = req.body.password;
          let hash = bcrypt.hashSync(password, 12);
          var password = hash;
          User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
          })
            .then(result => {
              if (result) {
                // res.redirect('/login')
                //console.log(result);
                var payload = {
                  id: result.id,
                  email: result.email
                };
                //console.log(process.env.secretOrkey);
                jwt.sign(
                  payload,
                  process.env.secretOrkey,
                  { expiresIn: 60 },
                  (err, token) => {
                    var refreshToken = randToken.uid(250);
                    var date = new Date();
                    // console.log(refreshToken);
                    //console.log(token);
                    refreshTokenYolo = refreshToken;
                    Token.create(
                      token,
                      new Date(date.getTime() + 5 * 60 * 1000),
                      refreshToken,
                      new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000),
                      result.id
                    );
                    res.cookie("refreshtoken", refreshToken, {
                      maxAge: 9000000000,
                      httpOnly: true
                    });
                    return res.json({
                      payload,
                      success: true,
                      token: "Bearer " + token,
                      refreshToken: refreshTokenYolo
                    });
                    //) res.status(200).send(result);
                  }
                );
              }
            })
            .catch(err => {
              if (err) {
                res.sendStatus(401);
              }
            });
        }
      })
      .catch(err => console.log(err));
  }
}
///////////////////////////////////////////////////////////////////////////////////// LOGIN SECTION
function logIn(req, res) {
  let { errors, isValid } = loginValidation(req.body);
  if (isValid) {
    var { email, password } = req.body;
    User.find(email)
      .then(data => {
        // console.log(data.rows);
        if (data.rows.length > 0) {
          var pass = data.rows[0].password;
          var password = req.body.password;
          bcrypt.compare(password, pass).then(isMatch => {
            // console.log(isMatch);
            if (isMatch) {
              //return res.send("you logged in successfully");
              var payload = {
                id: data.rows[0].id,
                email: data.rows[0].email
              };
              //console.log(process.env.secretOrkey);
              jwt.sign(
                payload,
                process.env.secretOrkey,
                { expiresIn: 60 },
                (err, token) => {
                  var refreshToken = randToken.uid(250);
                  var date = new Date();
                  // console.log(refreshToken);
                  //console.log(token);
                  refreshTokenYolo = refreshToken;
                  Token.create(
                    token,
                    new Date(date.getTime() + 5 * 60 * 1000),
                    refreshToken,
                    new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000),
                    data.rows[0].id
                  );
                  res.cookie("refreshtoken", refreshToken, {
                    maxAge: 900000,
                    httpOnly: true
                  });
                  return res.json({
                    payload,
                    success: true,
                    token: "Bearer " + token,
                    refreshToken: refreshTokenYolo
                  });
                  //) res.status(200).send(result);
                }
              );
            } else {
              return res.send("wrong password");
            }
          });
        } else {
          res.status(200).json("no user with such email found");
        }
      })
      .catch(err => console.log(err));
  } else {
    res.status(404).json(errors);
  }
}
/////////////////////////////////////////////////////////////////////////////////////first request
function enter(req, res) {
  //console.log(req.cookies.refreshtoken, "we have it");
  var cookieValue = req.cookies.refreshtoken;
  //console.log(cookieValue, "we have it'oot");

  if (cookieValue !== undefined) {
    Token.findRefreshToken(cookieValue)
      .then(data => {
        // console.log("data from refresh token");
        // console.log(data);
        if (data) {
          return res.status(200).json(data);
        }
      })
      .catch(err => console.log(err));
  } else {
    return res.send("no cookie found");
  }
}

////////////////////////////////////////////////////////////////////////////logout request
function logOut(req, res) {
  var user_id = req.body.id;
  Token.delete(user_id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => console.log(err));
}
//////////////////////////////////////////////////////////////////////// refresh token request
function refreshToken(req, res) {
  var refreshTokenFormCookies = req.body.refreshtoken;
  console.log(refreshTokenFormCookies, "ayy");

  Token.findRefreshToken(refreshTokenFormCookies)
    .then(result => {
      console.log("results", result);
      var expirydate = result.refresh_token_expires_at;
      // console.log("user_id", result.user_id);
      var newDate = new Date();
      var comparison = expirydate.getTime() > newDate.getTime() ? true : false;
      // console.log(comparison);
      if (comparison) {
        User.findById(result.user_id)
          .then(data => {
            // console.log(data.rows);
            if (data.rows.length > 0) {
              // res.send("you logged in successfully");
              var payload = {
                id: data.rows[0].id,
                email: data.rows[0].email
              };
              // console.log(payload);
              //console.log(process.env.secretOrkey);
              jwt.sign(
                payload,
                process.env.secretOrkey,
                { expiresIn: 60 },
                (err, token) => {
                  var refreshToken = randToken.uid(250);
                  var date = new Date();
                  // console.log(refreshToken);
                  //console.log(token);
                  Token.update(
                    token,
                    new Date(date.getTime() + 5 * 60 * 1000),
                    refreshToken,
                    new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000),
                    data.rows[0].id
                  );
                  res.cookie("refreshtoken", refreshToken, {
                    maxAge: 900000,
                    httpOnly: true
                  });
                  return res.json({
                    payload,
                    success: true,
                    token: "Bearer " + token
                  });
                  //) res.status(200).send(result);
                }
              );
            } else {
              res.status(400).json("no user with such id found");
            }
          })
          .catch(err => console.log(err));
      } else {
        res
          .status(400)
          .json({ message: "invalid refresh token please login again" });
      }
    })
    .catch(err => console.log(err));
}

module.exports.signUp = signUp;
module.exports.logIn = logIn;
module.exports.enter = enter;
module.exports.logOut = logOut;
module.exports.refreshToken = refreshToken;
