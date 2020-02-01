const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

app.use(
  cors({
    preflightContinue: true,
    credentials: true,
    origin: "http://localhost:4200"
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const port = process.env.PORT || 5000;

const User = require("./server/routes/api/user");
const Post = require("./server/routes/api/post.js");
const Follow = require("./server/routes/api/follow.js");
const isAuth = require("./server/validation/tokenValidation");

//////////////////// routes
app.post("/auth", isAuth, (req, res) => {
  res.json({
    message: "all good"
  });
});
app.post("/signup", User.signUp);
app.post("/login", User.logIn);
//app.get("/", User.enter);
app.post("/logout", User.logOut);
app.get("/refreshtoken", User.refreshToken);

app.post("/posts/post", isAuth, Post.create);
app.post("/posts/get", Post.find);
app.patch("/posts/update/:id", isAuth, Post.update);
app.delete("/posts/delete/:id", isAuth, Post.delete);
//
app.post("/follow/create", isAuth, Follow.create);
app.post("/follow/delete", isAuth, Follow.delete);
app.post("/follow/getfollowers", isAuth, Follow.getfollowers);

//

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
