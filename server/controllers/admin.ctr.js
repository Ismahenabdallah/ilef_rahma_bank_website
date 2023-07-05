const asynHandler = require('express-async-handler');
const User = require('../model/user.model')
const bcrypt = require('bcryptjs');
const validator = require("validator");



require('dotenv').config()
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
// const updateUser=asynHandler(async(req,res)=>{
//     //const user1 =await User.updateOne()
//   //   const user =await  User.findOneAndUpdate(
//   //     {_id: user._id},
//   //      req.body,
//   //     {new: true}
//   // ).then(user=>{
//   //   res.status(200).json(user)
//   // })
//   try {
//     await User.findById(req.params.id)
//     .then(async (profile)=>{

//            await  User.findOneAndUpdate(
//                 {_id: profile._id},
//                  req.body,
//                 {new: true}
//             ).then(result=>{
//                 res.status(200).json({message:"update succsessfully ",result})
//             })

//   })
//   } catch(err){
//     console.log(err)
//     res.json(err)
//   }
//   })
const searchUser = asynHandler(async (req, res) => {
    const { query } = req.body;
    const userPattern = new RegExp("^" + query);
    User.find({ email: { $regex: userPattern } })
        .select("_id email firstName lastName CIN ")
        .then(users => {
            res.json(users);
        }).catch(err => {
            console.log(err);
        });
});
const getAllUsers = asynHandler(async (req, res) => {
    try {
        let users = await User.find();
        // if (users.role != "admin")
            return res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
})

const AddUser = asynHandler(async (req, res) => {

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
            return res.status(400).json({ msg: " doit être un nombre." });
        } if (isNaN()) {
            return res.status(400).json({ msg: " doit être un nombre." });
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
            ...req.body, password: passwordHash, confirm: passwordHash, isAdmin: true,
        })
        //jwt.sign(email, process.env.PRIVATE_KEY, { expiresIn: '15m' })

        await newUser.save()

        res.status(200).json({ newUser, message: "user added ..! " });
    }




    catch (error) {
        res.status(404).json(error.message)
    }
})
const DeleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndRemove({ _id: req.params.id })
        res.status(200).json({ message: "deleted" })

    } catch (error) {
        res.status(404).json(error.message)
    }
}
//getById-->details
const getByiD = asynHandler(async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        res.status(200).json({ user, message: "succces" })
        //if(!user) return res.status(404).json({message: "user not found"})
    } catch (error) {
        res.status(404).json({ message: "user not found" })
        res.status(404).json(error)
    }
})
const updateUser = asynHandler(async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Vérifier si tous les champs requis sont présents
        const { firstName, lastName } = req.body;
        if (!lastName || !firstName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Mettre à jour l'utilisateur
        user.lastName = lastName;

        user.firstName = firstName;
        const updatedUser = await user.save();

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = {
    getAllUsers,
    searchUser,
    AddUser,
    DeleteUser,
    getByiD,
    updateUser


}
