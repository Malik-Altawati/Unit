const express = require('express')
const app = express()
const cors = require("cors");
const port = process.env.PORT || 3000
const IncomingForm = require('formidable').IncomingForm;
const path = require('path')
//
const fs = require('fs');
const uniqueId = require('uuid');

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
        var id = uniqueId()
        file.path = 'folders/uploaded/' + id + "." + file.name.split(".")[1];
        console.log(path.join(__dirname, "/../Unit/folders/uploaded/", id + "." + file.name.split(".")[1]))
        link = path.join(__dirname, "/../Unit/folders/uploaded/", id + "." + file.name.split(".")[1])
    });

    form.on('end', (err, data) => {
        console.log("done")
        console.log(user_id, post, link)
    })
});




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
