const express = require('express')
const cors = require("cors");
const port = process.env.PORT || 5000
const User = require('./controllers/users');
const Post = require('./controllers/posts');

const app = express()

app.use(cors());
app.use(express.json());

console.log('----------------------------')
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
///////////////////////////////////////////////////////////////////////////////////// POSTS SECTION
app.post('/posts/post', (req, res) => {
    let postObj = { post : req.body.post, link : req.body.link, user_id : req.body.id};
    console.log(postObj)
    Post.create(postObj).then(data => {
        if (data) {
            return res.send(data)
        } else {
            console.error(err);
        }
    })
})

app.get('/posts/get', (req, res) => {
    let { user_id } = req.body.id
    Post.find(user_id).then(data => {
        if (data) {
            return res.send(data)
        } else {
            console.error(err);
        }
    })
})

app.patch('/posts/update/:id', (req, res) => {
    let { post , user_id } = req.body;
    let id = req.params.id;
    Post.update(post , id, user_id).then(data => {
        if (data) {
            return res.send(data)
        } else {
            console.error(err);
        }
    })
})

app.delete('/posts/delete/:id', (req, res) => {
    let { user_id } = req.body;
    let id = req.params.id;
    Post.delete(id, user_id).then(data => {
        if (data) {
            console.log('Deleted');
        } else {
            console.error(err);
        }
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))