const express = require('express');
const router = express.Router();
const { 
  getMedicines, 
  createMedicine, 
  updateMedicine, 
  deleteMedicine 
} = require('../controllers/medicineController');
const { protect, pharmacyOnly } = require('../middleware/authMiddleware');

router.route('/')
  .get(getMedicines)
  .post(protect, pharmacyOnly, createMedicine);

router.route('/:id')
  .put(protect, pharmacyOnly, updateMedicine)
  .delete(protect, pharmacyOnly, deleteMedicine);

module.exports = router;
