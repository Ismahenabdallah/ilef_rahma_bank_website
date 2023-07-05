const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const compteSchema = new mongoose.Schema({




  Solde_Cpt: String,
  Date_Ouverture_Cpt: {
    type: Date,
    default: Date.now
  },
  Type_Cpt: {
    type: String,
    enum: ['épargne', 'chéque'],
    //required: true
  },


  Id_Clt: { type: ObjectId, ref: "users" },


},
  { timestamps: true }

);
module.exports = mongoose.model('comptes', compteSchema)


