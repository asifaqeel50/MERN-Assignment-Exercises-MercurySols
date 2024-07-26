const express = require('express');
const router = express.Router();
const OrderItem = require('../models/orderItem');

// GET all order items
router.get('/', async (req, res) => {
  try {
    const orderItems = await OrderItem.find()
      .populate('orderId')
      .populate('productId');
    res.json(orderItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET order items for a specific order
router.get('/order/:orderId', async (req, res) => {
  try {
    const orderItems = await OrderItem.find({ orderId: req.params.orderId })
      .populate('productId');
    res.json(orderItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Additional CRUD operations...

module.exports = router;