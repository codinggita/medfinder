const Order = require('../models/Order');

// @desc   Create new order
// @route  POST /api/orders
// @access Private
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, subtotal, deliveryCharge, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // JWT decoded payload uses .id not ._id
    const userId = req.user.id || req.user._id;

    const order = new Order({
      user: userId,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      subtotal,
      deliveryCharge: deliveryCharge || 0,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (err) {
    console.error('createOrder error:', err.message);
    res.status(500).json({ message: err.message || 'Server error while placing order' });
  }
};

// @desc   Get logged-in user orders
// @route  GET /api/orders/myorders
// @access Private
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('getMyOrders error:', err.message);
    res.status(500).json({ message: err.message || 'Server error fetching orders' });
  }
};

// @desc   Get all orders (admin)
// @route  GET /api/orders
// @access Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('getAllOrders error:', err.message);
    res.status(500).json({ message: err.message || 'Server error fetching all orders' });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders };
