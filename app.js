const express = require('express')
const app = express()
const cors = require("cors");
const port = process.env.PORT || 3000
const IncomingForm = require('formidable').IncomingForm;
const path = require('path')
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
const User = require('./controllers/users');



app.post('/upload', (req, res) => {
    const form = new IncomingForm();
    form.keepExtensions = true;
    form.maxFieldsSize = 30 * 1024 * 1024; // 10mb
    form.multiples = true;
    form.on('fileBegin', function (name, file) {
        file.path = 'up/' + file.name;

        console.log(path.join(__dirname, "/../Unit/up/", file.name))
    });
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send(err)
        }
        res.end();

    });

    form.on('end', (err, data) => {
        console.log("done")
    })
});

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


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
