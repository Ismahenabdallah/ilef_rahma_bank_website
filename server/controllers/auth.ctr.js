const validator = require("validator");
const asynHandler = require('express-async-handler');
const User = require("../model/user.model");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
require('dotenv').config()
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
const Register = asynHandler(async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirm, CIN } = req.body;

        if (!firstName || !lastName || !email || !password || !confirm || !CIN)
            return res.status(400).json({ msg: "Please fill in all fields." })
        if (!validateEmail(email))
            return res.status(400).json({ msg: "Invalid emails." })
        if (password.length < 6)
            return res.status(400).json({ msg: "Password must be at least 6 characters." })
        if (CIN.length < 8 || CIN.length > 8)
            return res.status(400).json({ msg: "cin must be at least 8 characters." })
        if (!validator.equals(password, confirm))
            return res.status(400).json({ msg: "Passwords not matches." })
        const user = await User.findOne({ email })
        if (isNaN(CIN)) {
            return res.status(400).json({ msg: "Le CIN doit être un nombre." });
        }

        if (user)
            return res.status(400).json({ msg: "email already exist. " })
        const userCIN = await User.findOne({ CIN })
        if (userCIN)
            return res.status(400).json({ msg: "CIN already exist. " })

        if (!/^[01]/.test(CIN)) {
            return res.status(400).json({ msg: "Le CIN doit commencer par 0 ou 1." });
        }
        const passwordHash = bcrypt.hashSync(password, 12)
        const newUser = new User({
            ...req.body, password: passwordHash, confirm: passwordHash
        })
        //jwt.sign(email, process.env.PRIVATE_KEY, { expiresIn: '15m' })

        await newUser.save()

        res.status(200).json({ newUser, message: "success" });
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})
const Login = asynHandler(async (req, res) => {
    try {
        const { email, password, } = req.body
        if (!email || !password)
            return res.status(422).json({ msg: "please add email or password" })

        const user = await User.findOne({ email: email })
        if (!user)
            return res.status(400).json({ msg: "This email does not exist." })



        ///await is important 
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ msg: "Password is incorrect." })

        } else {
            var token = jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                compteBancaire: user.compteBancaire,
                firstName: user.firstName,
                lastName: user.lastName,
                CIN: user.CIN,
                isAdmin: user.isAdmin,
                TokenCompteBancaire: user.TokenCompteBancaire
            }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
            res.status(200).json({
                message: "success",
                token: "Bearer " + token,
                role: user.role, isAdmin: user.isAdmin,

            })
        }




    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

module.exports = {
    Register,
    Login
}