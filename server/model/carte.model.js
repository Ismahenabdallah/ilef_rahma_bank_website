const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const carteSchema = new mongoose.Schema({



  Num_cart: String,
  date_expiration: Date,
  code_securite: String,
  status: {
    type: String,
    enum: ['approuvee', 'en_attente'],
    default: 'en_attente'
  },

  Id_Clt: [{ type: ObjectId, ref: "users" }],


},
  { timestamps: true }

);
module.exports = mongoose.model('cartes', carteSchema)

