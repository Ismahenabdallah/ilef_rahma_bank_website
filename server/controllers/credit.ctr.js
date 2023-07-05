const Credit = require("../model/credit.model");
const asynHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const User = require('../model/user.model');
// Create and Save a new Credit
const jwt = require('jsonwebtoken')
require('dotenv').config()


const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  service: process.env.SERVICE,
  port: 587,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});





// controllers/userController.js



const demandeCredit = asynHandler(async (req, res) => {
  const { salaire_Clt, Montant } = req.body;
  const userId = req.user._id;

  try {


    if (!Montant || !salaire_Clt)
      return res.status(400).json({ msg: "Please fill in all fields." });
    if (isNaN(Montant) || isNaN(salaire_Clt))
      return res.status(400).json({ msg: " doit être un nombre." });
    const creditDemande = new Credit({
      ...req.body,
      Id_Clt: userId
    });
    await creditDemande.save();
    // Mettre à jour l'attribut `creditDemande` de l'utilisateur
    await User.findByIdAndUpdate(userId, { creditDemande });

    res.status(201).json({
      success: true,
      message: 'Demande de crédit envoyée avec succès',
      creditDemande
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
})


// Fonction pour envoyer un email

const AdminCredit = asynHandler(async (req, res) => {
  const creditPost = await User.findOne({ _id: req.params.id });

  const { id } = req.params;
  const { status } = req.body;
  try {

    if (!status) return res.status(401).json("ajouter l'etat de status")
    const validStatuses = ['pending', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      res.json(`La valeur du champ de statut doit être l'une des valeurs suivantes : ${validStatuses.join(', ')}`);

    }
    const creditRequest = await Credit.findByIdAndUpdate(id, { status }, { new: true }).populate('Id_Clt');
    res.json({ creditRequest });
    // Envoyer un e-mail de notification à l'utilisateur

    console.log(creditRequest.Id_Clt[0].email)
    const mailOptions = {
      from:  process.env.USER,
      to: creditRequest.Id_Clt[0].email,
      subject: 'État de votre demande de crédit',
      text: `Votre demande de crédit est ${status}`
    };
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error(err);
      else console.log(info);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
})

// Create a Compte





// Récupérer toutes les demandes de crédit en attente
// app.get('/credit-requests', async (req, res) => {
//   try {
//     const pendingCreditRequests = await Credit.find({ status: 'pending' }).populate('Id_Clt');
//     res.json({ pendingCreditRequests });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// Mettre à jour l'état d'une demande de crédit




// Retrieve all Comptes from the database.

const findAll = asynHandler(async (req, res) => {
  Credit.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving credit."
      });
    });
});
const getBystatus = asynHandler(async (req, res) => {
  try {
      const cred = await Credit.findOne({ _id: req.params.id })
      res.status(200).json({ cred, message: "succces" })
      //if(!user) return res.status(404).json({message: "user not found"})
  } catch (error) {
      res.status(404).json({ message: "user not found" })
      res.status(404).json(error)
  }
})

module.exports = {
  findAll, demandeCredit, AdminCredit,getBystatus
}