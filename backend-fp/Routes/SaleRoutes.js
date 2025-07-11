// /Routes/SaleRoutes.js
const express = require('express');
const router  = express.Router();
const saleController = require('../App/Controllers/SaleController');

// List all sales
// GET http://localhost:5001/Sales
router.get('/', saleController.getAll);

// Create new sale
// POST http://localhost:5001/Sales
router.post('/', saleController.create);

module.exports = router;
