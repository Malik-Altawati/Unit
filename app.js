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
const path = require("path");
const isAuth = require("./server/validation/tokenValidation");

//////////////////// routes
app.post("/auth", isAuth, (req, res) => {
  res.json({
    message: "all good"
  });
});

// app.post("/getuser", User.find);
app.post("/signup", User.signUp);
app.post("/login", User.logIn);
//app.get("/", User.enter);
app.post("/logout", User.logOut);
app.get("/refreshtoken", User.refreshToken);
app.get("/uploads/:name", (req, res) => {
  res.sendFile(path.resolve("folders/uploaded", req.params.name));
});
app.post("/posts/post", isAuth, Post.create);
app.post("/posts/get", isAuth, Post.find);
app.patch("/posts/update/:id", isAuth, Post.update);
app.post("/posts/delete", isAuth, Post.delete);
app.get("/getAllPosts", isAuth, Post.getAllPosts);
//
app.post("/follow/create", Follow.create);
app.post("/follow/delete", isAuth, Follow.delete);
app.post("/follow/getfollowers", isAuth, Follow.getfollowers);
app.get("/follow/getfollowersInfo", Follow.getInfoOfFollowers);

//
app.get("/getAllUsers", isAuth, User.getAll);
app.post("/findUser", isAuth, User.getUserByName);
app.post("/findById/", isAuth, User.findById); // doesnt return password
// app.post("/findByIdandUpdateUser", User.findByIdandUpdateUser); // returns password too
app.post("/updatePhoto", isAuth, User.UpdateProfilePhoto);
app.post("/updatepassword", isAuth, User.updatePass);
app.post("/updateprofile", isAuth, User.updateProfile);

app.listen(port, () => console.log(`Unit :) app listening on port ${port}!`));
