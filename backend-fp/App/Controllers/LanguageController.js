// backend-fp/App/Controllers/LanguageController.js

const Language = require('../../Models/LanguageModel');

// Get all languages
exports.getAllLanguages = async (req, res) => {
  try {
    const langs = await Language.find({});
    res.json(langs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch languages' });
  }
};

// Add a new language (optional, used if you want to POST from frontend)
exports.addLanguage = async (req, res) => {
  try {
    const { name, locale, flag } = req.body;
    const newLang = new Language({ name, locale, flag });
    await newLang.save();
    res.status(201).json(newLang);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add language' });
  }
};

// Delete a language by ID
exports.deleteLanguage = async (req, res) => {
  try {
    await Language.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete language' });
  }
};
