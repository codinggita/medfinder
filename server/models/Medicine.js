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
  brandName: {
    type: String,
    required: true,
    default: ''
  },
  category: {
    type: String,
    enum: ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream'],
    required: true
  },
  composition: {
    type: String,
    required: true,
    default: ''
  },
  manufacturer: {
    type: String,
    required: true,
    default: ''
  },
  expiryDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = medicineConn.model('Medicine', medicineSchema);
