const db = require("./db");
const mongoose = require("mongoose");
const messagesSchema = mongoose.Schema({
  message: String,
  sender: String,
  reciever: String,
  date: Date
});
const messagesModel = mongoose.model("messages", messagesSchema);
module.exports = messagesModel;
