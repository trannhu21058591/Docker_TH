const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');

const app = express();
app.use(express.json());

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/productdb';
mongoose.connect(mongoURL)
  .then(() => console.log("Connected to MongoDB - Product"))
  .catch(err => console.error(err));

app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

app.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send('Not found');
  res.json(product);
});

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.put('/products/:id', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.listen(3001, () => console.log("Product Service listening on port 3001"));
