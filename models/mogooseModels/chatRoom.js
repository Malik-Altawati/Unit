const db = require("../../db/dbMongo");
const mongoose = require("mongoose");
let ChatRoomSchema = mongoose.Schema({
  name: String,
  messages: []
});
let ChatRoomModel = mongoose.model("chatrooms", ChatRoomSchema);
// ChatRoomModel.create({ name: "raghda", messages: [] });
console.log("char room created");
module.exports = ChatRoomModel;
