const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerId: String,
  products: [String], // hoặc bạn có thể dùng object chứa id, quantity
  total: Number,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);