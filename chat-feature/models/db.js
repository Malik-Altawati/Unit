const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/chatimitation", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let db = mongoose.connection;
db.once("open", () => {
  console.log("database created successfully");
});
db.on("error", () => {
  console.log("unable to connect to database");
});
module.exports = db;
