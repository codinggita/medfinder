const mongoose = require('mongoose');
const { userConn } = require('../config/db');

const orderItemSchema = new mongoose.Schema({
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  pharmacyName: { type: String, default: '' },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    shippingAddress: {
      fullName: { type: String, required: true },
      mobile: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    paymentMethod: { type: String, default: 'Cash on Delivery' },
    subtotal: { type: Number, required: true },
    deliveryCharge: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    estimatedDelivery: { type: String, default: '30–60 minutes' },
  },
  { timestamps: true }
);

// Use userConn — the active named connection (NOT the default mongoose connection which is never connected)
module.exports = userConn.model('Order', orderSchema);

