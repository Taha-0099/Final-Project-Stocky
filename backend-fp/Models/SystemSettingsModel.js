// backend/Models/SystemSettingsModel.js

const mongoose = require('mongoose');

const SystemSettingsSchema = new mongoose.Schema({
  currency: { type: String, default: "US Dollar" },
  companyName: { type: String, required: true },
  footer: { type: String, required: true },
  warehouse: { type: String, default: "Warehouse 1" },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  language: { type: String, default: "English" },
  smsGateway: { type: String, default: "twilio" },
  logo: { type: String, default: null },
  developedBy: { type: String, required: true },
  customer: { type: String, default: "walk-in-customer" },
  timeZone: { type: String, default: "UTC/GMT +00:00 - UTC" },
  invoiceFooter: { type: Boolean, default: false },
  createQuotation: { type: Boolean, default: true },
  showLanguages: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('SystemSettings', SystemSettingsSchema);
