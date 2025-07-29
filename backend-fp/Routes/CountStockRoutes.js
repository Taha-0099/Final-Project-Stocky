const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const CountStockController = require('../App/Controllers/CountStockController');

// GET all stock counts (for CS.js)
router.get('/', CountStockController.getAllStocks);

// POST route for counting stock
router.post('/count', CountStockController.countStock);

// Excel download route (for exported files)
router.get('/download/:filename', (req, res) => {
  // Folder where you save exported files
  const exportFolder = path.join(__dirname, '../uploads'); // Fixed to 'uploads'
  const fileName = req.params.filename; // e.g., 'stock_export_1752922392799.xlsx'
  const filePath = path.join(exportFolder, fileName);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  // Send the file as a download
  res.download(filePath, fileName, (err) => {
    if (err) {
      return res.status(500).send('Failed to download file');
    }
  });
});

module.exports = router;
