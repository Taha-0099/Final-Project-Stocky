// /Routes/PurchaseRoutes.js
const express = require('express');
const router  = express.Router();
const purchaseController = require('../App/Controllers/PurchaseController');

// list all purchases
router.get('/',    purchaseController.getAll);

// create new purchase
router.post('/',   purchaseController.create);

module.exports = router;
