



var express = require('express');

const { findAll, create, find, update, deleteAccount } = require('../controllers/compte.ctr');
const { authorize } = require('../middleware/Guard');


var router = express.Router();

/* GET users listing. */
router.post('/add', authorize(['User']), create);
router.patch('/update', authorize(['User']), update);
router.get("/get", authorize(['Admin']), findAll);
router.get("/find", authorize(['User']), find);
router.delete("/delete", authorize(['User']), deleteAccount);
module.exports = router;