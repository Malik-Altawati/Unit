const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");

const http = require("http");
const db = require("./models/db");
const userCollection = require("./models/users");
const messages = require("./models/messages");
const onlineuserCollection = require("./models/online");

var handle = require("./file");
var private = null;
var users = {};
var keys = {};
const app = express();
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
let port = process.env.PORT || 7000;
app.use(express.static(__dirname + "/views"));
let server = http.Server(app);
let io = socketIO(server);
app.post("/login", (req, res) => {
  console.log(req.body.handle);
  handle = req.body.handle;
  //console.log(handle);
  userCollection
    .findOne({ handle: req.body.handle })
    .then(data => {
      if (data === null) {
        res.status(400).json({ data: "no user found" });
      } else {
        res.status(200).json("success");
      }
    })
    .catch(err => console.log(err));
});
app.post("/register", (req, res) => {
  console.log(req.body);
  userCollection
    .findOne({ handle: req.body.handle })
    .then(data => {
      console.log(data);
      if (data === null) {
        let user = {
          name: req.body.name,
          handle: req.body.handle,
          password: req.body.password,
          phone: req.body.phone,
          email: req.body.email
        };
        userCollection.create(user).then(data => {
          if (data) {
            res.status(200).json({ data: "user created successfully" });
          }
        });
      } else {
        res.status(400).json({ data: "user already exist" });
      }
    })
    .catch(err => console.log(err));
});
//console.log(handle);
app.post("/friend_request", (req, res) => {
  console.log(req.body);
  userCollection
    .find({
      handle: req.body.my_hundle,
      "friend.name": req.body.friend_hundle
    })
    .then(data => {
      if (data.length === 0) {
        console.log("friend request:", data.length);
        userCollection.update(
          {
            handle: req.body.my_hundle
          },
          {
            $push: {
              friends: { name: req.body.friend_hundle, status: "Pending" }
            }
          },
          { upsert: true }
        );
        io.to(users[req.body.friend_handle]).emit("message", req.body);
        res.status(200).json("friend request sent successfully");
      } else {
        res.status(400).json("request already sent");
      }
    })
    .catch(err => {
      console.log(err);
    });
});
app.post("/friend_request/confirmed", function(req, res) {
  console.log("friend request confirmed : " + req.body);
  if (req.body.confirm == "Yes") {
    userCollection.find(
      {
        handle: req.body.friend_handle,
        "friends.name": req.body.my_handle
      },
      function(err, doc) {
        if (err) {
          res.json(err);
        } else if (doc.length != 0) {
          console.log("Friend request confirmed : " + doc.length);
          console.log(
            "Friend request confirmed : friend request already sent " + doc
          );
          res.send("Friend request already accepted");
        } else {
          userCollection.update(
            {
              handle: req.body.my_handle,
              "friends.name": req.body.friend_handle
            },
            {
              $set: {
                "friends.$.status": "Friend"
              }
            },
            function(err, doc) {
              if (err) {
                res.json(err);
              } else {
                console.log("friend request confirmed : Inside yes confirmed");
                io.to(users[req.body.friend_handle]).emit(
                  "friend",
                  req.body.my_handle
                );
                io.to(users[req.body.my_handle]).emit(
                  "friend",
                  req.body.friend_handle
                );
              }
            }
          );
          userCollection.update(
            {
              handle: req.body.friend_handle
            },
            {
              $push: {
                friends: {
                  name: req.body.my_handle,
                  status: "Friend"
                }
              }
            },
            { upsert: true },
            function(err, doc) {
              if (err) {
                res.json(err);
              }
              //            else{
              //                console.log(doc);
              //            }
            }
          );
        }
      }
    );
  } else {
    console.log("friend request confirmed : Inside No confirmed");
    models.user.update(
      {
        handle: req.body.my_handle
      },
      {
        $pull: {
          friends: {
            name: req.body.friend_handle
          }
        }
      },
      function(err, doc) {
        if (err) {
          res.json(err);
        } else {
          console.log("No");
        }
      }
    );
  }
});

io.on("connection", function(socket) {
  console.log("Connection :User is connected  " + handle);
  console.log("Connection : " + socket.id);
  io.to(socket.id).emit("handle", handle);
  users[handle] = socket.id;
  keys[socket.id] = handle;
  console.log("Users list : " + users);
  console.log("keys list : " + keys);
  userCollection.find({ handle: handle }, { friends: 1, _id: 0 }, function(
    err,
    doc
  ) {
    if (err) {
      res.json(err);
    } else if (doc.length > 0) {
      friends = [];
      pending = [];
      all_friends = [];
      console.log("friends list: " + doc);
      list = doc[0].friends.slice();
      console.log(list);

      for (var i in list) {
        if (list[i].status == "Friend") {
          friends.push(list[i].name);
        } else if (list[i].status == "Pending") {
          pending.push(list[i].name);
        } else {
          continue;
        }
      }
      console.log("pending list: " + pending);
      console.log("friends list: " + friends);
      io.to(socket.id).emit("friend_list", friends);
      io.to(socket.id).emit("pending_list", pending);
      io.emit("users", users);
    }
  });

  socket.on("group message", function(msg) {
    console.log(msg);
    io.emit("group", msg);
  });

  socket.on("private message", function(msg) {
    console.log("message  :" + msg.split("#*@")[0]);
    messages.create({
      message: msg.split("#*@")[1],
      sender: msg.split("#*@")[2],
      reciever: msg.split("#*@")[0],
      date: new Date()
    });
    io.to(users[msg.split("#*@")[0]]).emit("private message", msg);
  });

  socket.on("disconnect", function() {
    delete users[keys[socket.id]];
    delete keys[socket.id];
    io.emit("users", users);
    console.log(users);
  });
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
