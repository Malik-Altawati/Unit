const express = require('express')
const app = express()
const cors = require("cors");
const port = process.env.PORT || 3000
const IncomingForm = require('formidable').IncomingForm;
const path = require('path')
//
const fs = require('fs');

//
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
const User = require('./controllers/users');


app.post('/upload', (req, res) => {
    const form = new IncomingForm();

    // form.keepExtensions = true;
    // form.maxFieldsSize = 30 * 1024 * 1024; // 10mb
    // form.multiples = false;

    var user_id;
    var post;
    var link;

    form.parse(req, function (err, fields, files) {
        user_id = fields.user_id
        post = fields.post_text

        if (err) {
            res.send(err)
        }
        res.end();
    });

    form.on('fileBegin', function (name, file) {
        file.path = 'folders/up/' + file.name;
        console.log(path.join(__dirname, "/../Unit/folders/up/", file.name))
        link = path.join(__dirname, "/../Unit/folders/up/", file.name)
    });

    form.on('end', (err, data) => {
        console.log("done")
        console.log(user_id, post, link)
    })
});




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
