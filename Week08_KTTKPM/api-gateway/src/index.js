const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Forward routes to services
app.use('/products', createProxyMiddleware({ target: 'http://product-service:3001', changeOrigin: true }));
app.use('/orders', createProxyMiddleware({ target: 'http://order-service:3002', changeOrigin: true }));
app.use('/customers', createProxyMiddleware({ target: 'http://customer-service:3003', changeOrigin: true }));

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});
