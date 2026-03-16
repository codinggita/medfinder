const express = require('express');
const router = express.Router();
const { getPharmacies } = require('../controllers/userController');

router.get('/pharmacies', getPharmacies);

module.exports = router;
