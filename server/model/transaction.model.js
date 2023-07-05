const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const TransactionSchema = new mongoose.Schema({


  Code_tran: String,
  Montant: String,


  Type_tran: String,


  Id_Clt: [{ type: ObjectId, ref: "users" }],


},
  { timestamps: true }

);
module.exports = mongoose.model('Transactions', TransactionSchema)
