const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const socketIO = require("socket.io");
const http = require("http");

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
app.get("/auth", isAuth, (req, res) => {
  console.log(req.cookies);
  res.json({
    message: "all good"
  });
});

// app.post("/getuser", User.find);
app.post("/signup", User.signUp);
app.post("/login", User.logIn);
//app.get("/", User.enter);
app.post("/logout", isAuth, User.logOut);
app.get("/refreshtoken", User.refreshToken);
app.get("/uploads/:name", (req, res) => {
  res.sendFile(path.resolve("folders/uploaded", req.params.name));
});
app.post("/posts/post", Post.create);
app.post("/posts/get", Post.find);
app.patch("/posts/update/:id", isAuth, Post.update);
app.post("/posts/delete", Post.delete);
app.get("/getAllPosts", Post.getAllPosts);
//
app.post("/follow/create", isAuth, Follow.create);
app.post("/follow/delete", isAuth, Follow.delete);
app.post("/follow/getfollowers", Follow.getfollowers);
app.get("/follow/getfollowersInfo", Follow.getInfoOfFollowers);
app.get("/follow/getfollowingList", Follow.getfollowingList);

//
app.get("/getAllUsers", User.getAll);
app.post("/findUser", isAuth, User.getUserByName);
app.post("/findById/", isAuth, User.findById); // doesnt return password
// app.post("/findByIdandUpdateUser", User.findByIdandUpdateUser); // returns password too
app.post("/updatePhoto", isAuth, User.UpdateProfilePhoto);
app.post("/updatepassword", isAuth, User.updatePass);
app.post("/updateprofile", isAuth, User.updateProfile);
//
const server = http.Server(app);
const io = socketIO(server);

const chatRooms = require("./models/mogooseModels/chatRoom");
app.get("/chatroom/:room", (req, res, next) => {
  console.log(chatRooms.find);
  let room = req.params.room;
  chatRooms
    .find({ name: room })
    .then(chatroom => {
      console.log(chatroom);

      res.json(chatroom[0].messages);
    })
    .catch(err => {
      console.log(err);
    });
});

io.sockets.on("connection", socket => {
  socket.on("join", data => {
    socket.join(data.room);
    console.log(chatRooms.find);
    chatRooms
      .find({})

      .then(rooms => {
        count = 0;
        rooms.forEach(room => {
          if (room.name == data.room) {
            count++;
          }
        });
        if (count == 0) {
          chatRooms.create({ name: data.room, messages: [] });
        }
      })
      .catch(err => console.log(err));
  });
  socket.on("message", data => {
    console.log(data);
    io.in(data.room).emit("new message", {
      user: data.user,
      message: data.message
    });
    chatRooms.update(
      { name: data.room },
      { $push: { messages: { user: data.user, message: data.message } } },
      (err, res) => {
        if (err) {
          console.log(err);
          return false;
        }
        console.log("Document updated");
      }
    );
  });
  socket.on("typing", data => {
    socket.broadcast
      .in(data.room)
      .emit("typing", { data: data, isTyping: true });
  });

});

server.listen(port, () =>
  console.log(`Unit :) app listening on port ${port}!`)
);
