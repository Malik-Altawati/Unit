const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.PORT || 5000;

const User = require("./server/routes/api/user");
const Post = require("./server/routes/api/post.js");
const Follow = require("./server/routes/api/follow.js");

//////////////////// routes

app.post("/posts/post", Post.create);
app.get("/posts/get", Post.find);
app.patch("/posts/update/:id", Post.update);
app.delete("/posts/delete/:id", Post.delete);
//
app.post("/follow/create", Follow.create);
app.post("/follow/delete", Follow.delete);
app.post("/follow/getfollowers", Follow.getfollowers);
//
app.post("/signup", User.signUp);
app.post("/login", User.logIn);
app.get("/", User.enter);
app.post("/logout", User.logOut);
app.post("/refreshtoken", User.refreshToken);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
