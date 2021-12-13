const express = require('express');
const consumerRouter = require("./resources/consumer/consumer.router");
const orderRouter = require("./resources/order/order.router");
const productRouter = require("./resources/product/product.router");

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/consumers', consumerRouter);
app.use('/orders', orderRouter);
app.use('/products', productRouter);

module.exports = app;