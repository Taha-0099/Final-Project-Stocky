// backend-fp/Routes/LanguageRoutes.js

const express = require('express');
const router = express.Router();
const LanguageController = require('../App/Controllers/LanguageController');

router.get('/', LanguageController.getAllLanguages);
router.post('/', LanguageController.addLanguage); // for adding language via API
router.delete('/:id', LanguageController.deleteLanguage); // for deleting a language

module.exports = router;
