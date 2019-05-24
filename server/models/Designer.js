const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const designerSchema = new Schema({
    name: String,
    age: String
  });

module.exports = mongoose.model("Designer", designerSchema)