var express = require('express');
const { getByiD, getAllUsers, AddUser, DeleteUser, updateUser, searchUser } = require('../controllers/admin.ctr');
const { authorize } = require('../middleware/Guard');

var router = express.Router();

/* GET users listing. */


router.get('/get/:id', authorize(['Admin']), getByiD);
router.get('/all',authorize(['Admin']), getAllUsers)
router.post('/add', authorize(['Admin']), AddUser)
router.delete('/del/:id', authorize(['Admin']), DeleteUser)

router.patch('/update/:id', authorize(['Admin']), updateUser)
router.get('/search', authorize(['Admin']), searchUser);

module.exports = router;