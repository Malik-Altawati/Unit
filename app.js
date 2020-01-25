const express = require('express')
const app = express()
const cors = require("cors");
const port = 3000
app.use(cors());
app.use(express.json());
const User = require('./controllers/users');
// app.use(express.static(__dirname + './../angular-client'));
// app.use(express.static(__dirname + './client/node_modules'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


///////////////////////////////////////////////////////////////////////////////////// SIGN UP SECTION
app.post('/signup', (req, res) => {
    let { username, password } = req.body
    User.find(username).then(data => {
        if (data.rows.length > 0) {
            res.send("UserName is Taken")
        } else {
            User.create({ username, password })
                .then(result => {
                    if (result) {
                        // res.redirect('/login')
                        res.send(result)
                    }
                })
                .catch(err => {
                    if (err) {
                        res.sendStatus(403)
                    }
                })
        }
    })
})
///////////////////////////////////////////////////////////////////////////////////// LOGIN SECTION
app.post('/login', (req, res) => {
    let { username, password } = req.body
    User.find(username).then(data => {
        if (data.rows.length > 0) {
            pass = data.rows[0].password
            if (pass == password) {
                res.send("Valid")
            } else {
                res.send("Invalid creds")
            }
        } else {
            res.send("invalid creds")
        }
    })
})
/////////////////////////////////////////////////////////////////////////////////////