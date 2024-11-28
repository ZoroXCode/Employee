// Create a user model with name company and position also with a db maned give-it-a-try in a collection named employee

const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/give-it-a-try";
mongoose.connect(DB_URI);

const employeeSchema = new mongoose.Schema({
  name: String,
  company: String,
  position: String,
});

module.exports = mongoose.model("employee", employeeSchema);
