

var express = require('express');

var router = express.Router();
const { getCarteBancaireByUserId, findAll } = require('../controllers/carte.ctr');
/* GET users listing. */
router.get('/', getCarteBancaireByUserId);
router.get("/", findAll);

module.exports = router;