const mongoose = require('mongoose');

const PosSettingSchema = new mongoose.Schema({
  note: { type: String, required: true },
  showPhone: { type: Boolean, default: true },
  showCustomer: { type: Boolean, default: true },
  showBarcode: { type: Boolean, default: true },
  showAddress: { type: Boolean, default: true },
  showWarehouse: { type: Boolean, default: true },
  showNote: { type: Boolean, default: true },
  showEmail: { type: Boolean, default: true },
  showTax: { type: Boolean, default: true },
  printInvoice: { type: Boolean, default: true },
  displayItems: { type: Number, default: 8 }
}, { timestamps: true });

module.exports = mongoose.model('PosSetting', PosSettingSchema);
