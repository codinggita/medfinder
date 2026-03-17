const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createOrder).get(protect, getAllOrders);
router.route('/myorders').get(protect, getMyOrders);

module.exports = router;
