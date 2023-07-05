
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const produitSchema = new mongoose.Schema({



  Type_Prod: {
    type: String
  },
  Id_Clt: [{ type: ObjectId, ref: "users" }],


},
  { timestamps: true }

);
module.exports = mongoose.model('produits', produitSchema)

