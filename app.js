const express = require('express')
const cors = require("cors");
const port = process.env.PORT || 5000
const User = require('./controllers/users');
const Post = require('./server/routes/post.js');

const app = express()

app.use(cors());
app.use(express.json());

app.post('/posts/post', Post.create);
app.get('/posts/get', Post.find);
app.patch('/posts/update/:id', Post.update);
app.delete('/posts/delete/:id', Post.delete);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))