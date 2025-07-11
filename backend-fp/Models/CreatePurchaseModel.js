// /Models/CreatePurchaseModel.js
const mongoose = require('mongoose');
mongoose.pluralize(null);
const { Schema } = mongoose;

const CreatePurchaseSchema = new Schema({
  date:          { type: Date,    required: true },
  ref:           { type: String,  required: true, unique: true },
  supplier:      { type: String,  required: true },
  warehouse:     { type: String,  required: true },
  orderTax:      { type: Number,  default: 0 },
  discount:      { type: Number,  default: 0 },
  shipping:      { type: Number,  default: 0 },
  status:        { type: String,  default: 'pending' },
  note:          { type: String,  default: '' },
  total:         { type: Number,  required: true },
  paid:          { type: Number,  default: 0 },
  due:           { type: Number,  required: true },
  paymentStatus: { type: String,  default: 'Unpaid' }
});

module.exports = mongoose.model('CreatePurchases', CreatePurchaseSchema);
