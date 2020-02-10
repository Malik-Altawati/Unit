const mongoose = require("mongoose");
let db = mongoose
  .connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
    useMongoClient: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("created"))
  .catch(err => console.log(err));
//let db = mongoose.connection;
// db.once("open", () => {
//   console.log("database created successfully");
// });
// db.on("error", () => {
//   console.log("unable to connect to database");
// });
module.exports = db;
