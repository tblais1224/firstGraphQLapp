const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const platformSchema = new Schema({
    name: String,
    manufacturer: String,
    releaseDate: String,
    value: Number,
    valueCIB: Number
  });

module.exports = mongoose.model("Platform", platformSchema)