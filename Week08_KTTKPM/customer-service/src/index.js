const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/Customer');

const app = express();
app.use(express.json());

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/customerdb';
mongoose.connect(mongoURL)
  .then(() => console.log("Connected to MongoDB - Customer"))
  .catch(err => console.error(err));

app.post('/customers', async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.status(201).json(customer);
});

app.get('/customers/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('Not found');
  res.json(customer);
});

app.get('/customers', async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

app.listen(3003, () => console.log("Customer Service listening on port 3003"));
