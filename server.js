const express = require('express');
const mongoose = require('mongoose');
const Product = require('./productModel');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/expressProductApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/', (req, res) => {
    res.send('Hello, this is the Express Product App!');
});


app.post('/product', async (req, res) => {
    const { title, price, category, inStock } = req.body;
  
    try {
      const product = new Product({ title, price, category, inStock });
      await product.save();
      res.status(201).send('Product created successfully!');
    } catch (error) {
      res.status(400).send('Error creating product: ' + error.message);
    }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});