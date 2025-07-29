// backend/Routes/SystemSettingsRoutes.js

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const controller = require('../App/Controllers/SystemSettingsController');

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + file.fieldname + ext);
  }
});
const upload = multer({ storage });

// GET settings
router.get('/', controller.getSettings);

// PUT (update) settings (with logo upload)
router.put('/', upload.single('logo'), controller.updateSettings);

// Clear cache
router.post('/clear-cache', controller.clearCache);

module.exports = router;
