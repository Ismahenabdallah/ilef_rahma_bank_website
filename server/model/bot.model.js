const mongoose = require("mongoose");
const botSchema = new mongoose.Schema({



  Nom: String,
  Type: String,
  Langue: String,




},
  { timestamps: true }

);
module.exports = mongoose.model('bots', botSchema)





