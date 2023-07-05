const User = require('../model/user.model');
const BankAccount = require('../model/compte.model');
const asynHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
require('dotenv').config()
// Create and Save a new Compte

const create = asynHandler(async (req, res) => {
  try {
    const { Solde_Cpt, Type_Cpt } = req.body;
    const userId = req.user._id;



    // Vérifier si l'utilisateur a déjà un compte bancaire
    const user = await User.findById(userId).populate('compteBancaire');
    if (user.compteBancaire) {
      return res.status(403).json({ message: "Vous avez déjà un compte bancaire!" });
    }
    if (!Solde_Cpt || !Type_Cpt) {
      return res.status(400).json({ message: "Veuillez remplir tous les champs." });
    }
    // Créer le compte bancaire
    const newBankAccount = await BankAccount.create({
      Id_Clt: userId, // Stocker l'ID client dans la table "compte"
      ...req.body
    });
    // Générer un token de rafraîchissement
    const TokenCompteBancaire = jwt.sign({
      compteBancaire: newBankAccount,

    }, process.env.PRIVATE_KEY);

    // Mettre à jour la table "utilisateur" avec l'ID de compte
    await User.findByIdAndUpdate(
      userId,
      { compteBancaire: newBankAccount, TokenCompteBancaire: TokenCompteBancaire }
    );
    const newuser = await User.findById(userId).populate('compteBancaire');

    res.status(200).json({ message: "Compte créé avec succès!", newBankAccount, TokenCompteBancaire, newuser });
  } catch (error) {
    res.status(500).json(error);
  }
})

const find = asynHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('compteBancaire'); res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
})

const update = asynHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { firstName, lastName, Solde_Cpt, Type_Cpt } = req.body;

    // Récupérer l'objet User à mettre à jour et sa référence Compte
    const user = await User.findById(userId).populate('compteBancaire');
    const compte = user.compteBancaire;

    // Mettre à jour les attributs de l'objet User
    user.firstName = firstName;
    user.lastName = lastName;



    // Vérifier si le compte existe
    if (compte) {
      // Mettre à jour les attributs de l'objet Compte
      compte.Solde_Cpt = Solde_Cpt;
      compte.Type_Cpt = Type_Cpt;
      await compte.save();
    }

    // Sauvegarder les modifications dans la base de données
    await user.save();

    res.status(200).json({ message: "updated successfully", user });

  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }
});
const deleteAccount = asynHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('compteBancaire');

    // if (!user.compteBancaire) {
    //   return res.status(400).json({ message: "Ce compte n'a pas de compte bancaire associé" });
    // }

    const compteBancaireId = user.compteBancaire._id;

    // Supprimer la table de compte bancaire correspondante
    await BankAccount.findByIdAndDelete(compteBancaireId);

    // Supprimer l'ID de compte bancaire de la table d'utilisateur
    user.compteBancaire = undefined;
    user.TokenCompteBancaire = undefined
    await user.save();

    res.status(200).json({ message: "Compte bancaire supprimé avec succès" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// const update = asynHandler(async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { firstName, lastName, CIN, Solde_Cpt, Type_Cpt } = req.body;

//     // Récupérer l'objet User à mettre à jour et sa référence Compte
//     const user = await User.findById(userId).populate('compteBancaire');
//     const compte = user.compteBancaire;
//     if (!compte) return res.status(400).json({ msg: "Pas de compte trouvé." })

//     // Mettre à jour les attributs de l'objet User
//     user.firstName = firstName;
//     user.lastName = lastName;
//     user.CIN = CIN;

//     // Mettre à jour les attributs de l'objet Compte
//     compte.Solde_Cpt = Solde_Cpt
//     compte.Type_Cpt = Type_Cpt

//     // Sauvegarder les modifications dans la base de données
//     await user.save();
//     await compte.save();

//     res.status(200).json({ user });

//   } catch (error) {
//     res.status(500).json(error);
//     console.log(error)
//   }
// });




// const create = asynHandler(async (req, res) => {
//   try {
//     const { Solde_Cpt, Type_Cpt } = req.body;
//     const userId = req.user._id;

//     // Vérifier si l'utilisateur a déjà un compte bancaire
//     const user = await User.findById(userId).populate('compteBancaire');
//     if (user.compteBancaire) {
//       return res.status(403).json({ message: "Vous avez déjà un compte bancaire!" });
//     }
//     if (!Solde_Cpt || !Type_Cpt) {
//       return res.status(400).json({ message: "Veuillez remplir tous les champs." });
//     }

//     // Créer le compte bancaire
//     const newBankAccount = await BankAccount.create({
//       Id_Clt: userId, // Stocker l'ID client dans la table "compte"
//       ...req.body
//     });

//     // Générer un token de rafraîchissement
//     const TokenCompteBancaire = jwt.sign({ accountId: newBankAccount._id }, "compte");

//     // Mettre à jour le modèle User avec le nouveau compte bancaire et le token de rafraîchissement
//     user.compteBancaire = newBankAccount._id;
//     user.TokenCompteBancaire = TokenCompteBancaire;
//     await user.save();

//     res.status(200).json({ message: "Compte créé avec succès!", TokenCompteBancaire });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });











// Create a Compte

// Retrieve all Comptes from the database.

const findAll = asynHandler(async (req, res) => {
  try {
    const data = await BankAccount.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message
    });
  }
});

module.exports = {
  create, findAll, find, update, deleteAccount
}