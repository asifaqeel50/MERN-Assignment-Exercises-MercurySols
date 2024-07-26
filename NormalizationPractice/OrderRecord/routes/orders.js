const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const mongoose = require('mongoose');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('customerId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific order with its items
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customerId');
    const orderItems = await OrderItem.find({ orderId: req.params.id }).populate('productId');
    res.json({ order, items: orderItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new order
router.post('/', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { customerId, items, ...orderData } = req.body;
    
    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const order = new Order({
      customerId,
      ...orderData,
      totalAmount
    });
    await order.save({ session });

    const orderItems = items.map(item => ({
      orderId: order._id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    }));
    await OrderItem.insertMany(orderItems, { session });

    await session.commitTransaction();
    res.status(201).json(order);
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
});

// Additional CRUD operations...

module.exports = router;