// /Routes/QuotationRoutes.js
const express = require('express');
const router  = express.Router();
const quotationController = require('../App/Controllers/QuotationController');

// List all
router.get('/',    quotationController.getAll);

// Create new
router.post('/',   quotationController.create);

module.exports = router;
