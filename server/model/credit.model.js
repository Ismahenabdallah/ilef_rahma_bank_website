
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validStatuses = ['pending', 'accepted', 'rejected'];
const creditSchema = new mongoose.Schema({

  salaire_Clt: String,
  Montant: String,
 



  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },

  Id_Clt: [{ type: ObjectId, ref: "users" }],


},
  { timestamps: true }

);
module.exports = mongoose.model('credits', creditSchema)


