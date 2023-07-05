const db = require("../model/carte.model");
const asynHandler = require('express-async-handler');

// Create and Save a new Tutorial


// Retrieve all Cartes from the database.

const getCarteBancaireByUserId = asynHandler(async (req, res) => {
  try {
    const carteBancaire = await db.findOne({
      where: {
        Id_Clt: req.user.id
      }
    });
    if (!carteBancaire) {
      return res.status(404).json({
        error: 'Carte bancaire introuvable pour cet utilisateur'
      });
    }
    res.json(carteBancaire);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});
const findAll = asynHandler(async (req, res) => {
  db.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cartes."
      });
    });
});

module.exports = {
  findAll,
  getCarteBancaireByUserId
};