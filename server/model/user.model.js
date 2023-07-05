
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({

    email: String,
    firstName: String,
    lastName: String,
    password: String,
    confirm: String,
    Num: String,
    CIN: String,
    TokenCompteBancaire: String,
    TokenCredit: String,
    compteBancaire: {
        type: ObjectId,
        ref: 'comptes'
    },
    creditDemande: {
        type: ObjectId,
        ref: 'credits'
    },
    // creted by admin
    isAdmin: {
        type: Boolean,
        default: false,
    },

    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },




},
    { timestamps: true }

);
module.exports = mongoose.model('users', userSchema)


