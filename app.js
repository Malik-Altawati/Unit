const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const port = 3000;
app.use(cookieParser());
app.use(cors());
app.use(express.json());
const User = require("./server/routes/api/user");

app.post("/signup", User.signUp);
app.post("/login", User.logIn);
app.get("/", User.enter);
app.post("/logout", User.logOut);
app.post("/refreshtoken", User.refreshToken);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
