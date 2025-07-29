const express = require('express');
const router  = express.Router();
const purchaseController = require('../App/Controllers/PurchaseController');

router.get('/',    purchaseController.getAll);

router.post('/',   purchaseController.create);

router.put('/:id', purchaseController.update);     
router.delete('/:id', purchaseController.delete);  

module.exports = router;
