const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  country: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
