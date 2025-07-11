// /Routes/CreatePurchaseRoutes.js
const express = require('express');
const router  = express.Router();
const ctrl    = require('../App/Controllers/CreatePurchaseController');

// List all
// GET http://localhost:5001/CreatePurchase
router.get('/', ctrl.getAll);

// Create new
// POST http://localhost:5001/CreatePurchase
router.post('/', ctrl.create);

module.exports = router;
