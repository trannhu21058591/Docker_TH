const express = require('express');
const mongoose = require('mongoose');
const Order = require('./models/Order');

const app = express();
app.use(express.json());

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/orderdb';
mongoose.connect(mongoURL)
  .then(() => console.log("Connected to MongoDB - Order"))
  .catch(err => console.error(err));

app.post('/orders', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
});

app.get('/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).send('Not found');
  res.json(order);
});

app.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.put('/orders/:id', async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/orders/:id', async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.listen(3002, () => console.log("Order Service listening on port 3002"));
