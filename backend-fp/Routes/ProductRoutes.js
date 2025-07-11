const express = require('express');
const router  = express.Router();

const productController = require('../App/Controllers/ProductController');

// GET   /Products/             → list all
router.get('/',              productController.getAll);

// POST  /Products/addProduct  → create new
router.post('/addProduct',   productController.create);

// GET   /Products/:Product_id → get one
router.get('/:Product_id',    productController.getSingle);

// PUT   /Products/:Product_id → update
router.put('/:Product_id',    productController.updateProduct);

// DELETE/Products/:Product_id → delete
router.delete('/:Product_id', productController.deleteProduct);

module.exports = router;
