



var express = require('express');

const { findAll, demandeCredit, AdminCredit, getBystatus } = require('../controllers/credit.ctr');
const { authorize } = require('../middleware/Guard');
var router = express.Router();

/* GET users listing. */
router.post('/demande',authorize(['User']), demandeCredit);
router.get("/",authorize(['Admin']),findAll);
router.put('/statuscredit/:id', authorize(['Admin']) , AdminCredit);
router.get('/get/:id', authorize(['Admin']), getBystatus);
module.exports = router;