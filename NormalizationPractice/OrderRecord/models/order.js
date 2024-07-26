const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered'], default: 'Pending' },
  shippingAddress: String,
  paymentMethod: String,
  totalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);