const express = require('express');
const router = express.Router();
const SalesController = require('../App/Controllers/SaleController');

// All sales routes
router.get('/Sales', SalesController.getAllSales);
router.post('/Sales', SalesController.createSale);
router.get('/Sales/:id', SalesController.getSaleById);
router.put('/Sales/:id', SalesController.updateSale);
router.delete('/Sales/:id', SalesController.deleteSale);

module.exports = router;
