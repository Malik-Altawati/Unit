const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randToken = require("rand-token");
const cookieParser = require("cookie-parser");
const port = 3000;
app.use(cookieParser());
app.use(cors());
app.use(express.json());
const User = require("./controllers/users");
const Token = require("./controllers/tokens");
const regiteryValidation = require("./server/validation/registryValidation");
const loginValidation = require("./server/validation/loginValidation");

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

///////////////////////////////////////////////////////////////////////////////////// SIGN UP SECTION
app.post("/signup", (req, res) => {
  let { errors, isValid } = regiteryValidation(req.body);
  if (!isValid) {
    console.log("not valid");
    console.log(errors);
    res.status(400).json(errors);
  } else {
    console.log("is valid");
    var { username, email, password, ConfirmPassword } = req.body;
    User.find(email)
      .then(data => {
        //console.log(data);
        if (data.rows.length > 0) {
          res.status(400).json("user already exists");
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
                  { expiresIn: 900 },
                  (err, token) => {
                    var refreshToken = randToken.uid(250);
                    var date = new Date();
                    console.log(refreshToken);
                    //console.log(token);
                    Token.create(
                      token,
                      new Date(date.getTime() + 5 * 60 * 1000),
                      refreshToken,
                      new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000),
                      result.id
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
});
///////////////////////////////////////////////////////////////////////////////////// LOGIN SECTION
app.post("/login", (req, res) => {
  let { errors, isValid } = loginValidation(req.body);
  if (isValid) {
    var { email, password } = req.body;
    User.find(email)
      .then(data => {
        console.log(data.rows);
        if (data.rows.length > 0) {
          var pass = data.rows[0].password;
          var password = req.body.password;
          bcrypt.compare(password, pass).then(isMatch => {
            console.log(isMatch);
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
                { expiresIn: 900 },
                (err, token) => {
                  var refreshToken = randToken.uid(250);
                  var date = new Date();
                  console.log(refreshToken);
                  //console.log(token);
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
                    token: "Bearer " + token
                  });
                  //) res.status(200).send(result);
                }
              );
            } else {
              return res.send("wrong password");
            }
          });
        } else {
          res.status(400).json("no user with such email found");
        }
      })
      .catch(err => console.log(err));
  } else {
    res.status(404).json(errors);
  }
});
/////////////////////////////////////////////////////////////////////////////////////first request
app.get("/", (req, res) => {
  console.log(req.cookies.refreshtoken, "we have it");
  var cookieValue = req.cookies.refreshtoken;
  console.log(cookieValue, "we have it'oot");

  if (cookieValue !== undefined) {
    Token.findRefreshToken(cookieValue)
      .then(data => {
        console.log("data from refresh token");
        console.log(data);
        if (data) {
          return res.status(200).json(data);
        }
      })
      .catch(err => console.log(err));
  } else {
    return res.send("no cookie found");
  }
});
