




const db = require("../model/transaction.model");
const asynHandler = require('express-async-handler');

// Create and Save a new Credit

const create = asynHandler(async (req, res) => {
  try {

    const { Code_tran, Montant, Type_tran, } = req.body;

    if (!Code_tran || !Montant || !Type_tran)
      return res.status(400).json({ msg: "Please fill in all fields." });
    const Transaction = new db({
      ...req.body,
      Id_Clt: req.user.id,
    });
    await Transaction.save();

    res.status(200).json({ Transaction, message: "success" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create a Compte

// Retrieve all Comptes from the database.

const findAll = asynHandler(async (req, res) => {
  db.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Transaction."
      });
    });
});
module.exports = {
  create, findAll
}