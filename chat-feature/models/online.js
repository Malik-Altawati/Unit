const db = require("./db");
const mongoose = require("mongoose");
const onlineSchema = mongoose.Schema({
  handle: String,
  connection_id: String
});
const onlineModel = mongoose.model("online", onlineSchema);
module.exports = onlineModel;
