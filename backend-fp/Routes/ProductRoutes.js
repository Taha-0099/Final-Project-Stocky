const express = require('express');
const router  = express.Router();

const productController = require('../App/Controllers/ProductController');

router.get('/',              productController.getAll);

router.post('/addProduct',   productController.create);

router.get('/:Product_id',    productController.getSingle);

router.put('/:Product_id',    productController.updateProduct);

router.delete('/:Product_id', productController.deleteProduct);

module.exports = router;
