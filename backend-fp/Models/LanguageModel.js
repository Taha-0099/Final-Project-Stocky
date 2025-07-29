// backend-fp/Models/LanguageModel.js

const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  locale: { type: String, required: true, unique: true },
  flag: { type: String },
  isActive: { type: Boolean, default: true },
  isDefault: { type: Boolean, default: false }
});

module.exports = mongoose.model('Language', LanguageSchema, 'languages');
// -----> Forces the collection to be 'languages'
