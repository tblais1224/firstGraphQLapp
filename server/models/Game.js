const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    name: String,
    developer: String,
    publisher: String,
    genre: String,
    platformId: String,
    designerId: String
  });

module.exports = mongoose.model("Game", gameSchema)