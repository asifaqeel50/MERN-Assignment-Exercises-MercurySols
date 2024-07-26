const express = require('express');
const mongoose = require('mongoose');
const customersRouter = require('./routes/customers');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const orderItemsRouter = require('./routes/orderItems');

const app = express();

mongoose.connect('mongodb://localhost/order_management', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/api/customers', customersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/orderItems', orderItemsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));