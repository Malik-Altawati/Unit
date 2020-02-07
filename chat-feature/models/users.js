const db = require("./db");
const mongoose = require("mongoose");
const usersSchema = mongoose.Schema({
  name: String,
  handle: String,
  password: String,
  phone: String,
  email: String,
  friends: []
});
const UsersModel = mongoose.model("users", usersSchema);
module.exports = UsersModel;
