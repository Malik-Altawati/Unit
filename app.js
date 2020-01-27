const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const port = 3000;
app.use(cors());
app.use(express.json());
const User = require("./controllers/users");
const Token = require("./controllers/tokens");
const regiteryValidation = require("./server/validation/registryValidation");
const loginValidation = require("./server/validation/loginValidation");
// app.use(express.static(__dirname + './../angular-client'));
// app.use(express.static(__dirname + './client/node_modules'));
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
        console.log(data);
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
                res.status(200).send(result);
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
              return res.send("you logged in successfully");
            } else {
              return res.send("wrong password");
            }
          });
        } else {
          res.status(400).json("no user with such email found");
        }
        //   if (pass == password) {
        //     res.send("Valid");
        //   } else {
        //     res.send("Invalid creds");
        //   }
        // } else {
        //   res.send("invalid creds");
        // }
      })
      .catch(err => console.log(err));
  } else {
    res.status(404).json(errors);
  }
});
/////////////////////////////////////////////////////////////////////////////////////
