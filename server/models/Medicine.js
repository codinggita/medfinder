const mongoose = require('mongoose');
const { medicineConn } = require('../config/db');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true // index for faster text search
  },
  pharmacyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = medicineConn.model('Medicine', medicineSchema);
