
var express = require('express');
const { create } = require('../model/transaction.model');
const { findAll } = require('../controllers/transaction.ctr');
var router = express.Router();

/* GET usepostrs listing. */
router.post('/', create);
router.get("/", findAll);

module.exports = router;