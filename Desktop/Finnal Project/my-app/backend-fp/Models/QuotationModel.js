// /Models/QuotationModel.js
const mongoose = require('mongoose');
mongoose.pluralize(null);
const { Schema } = mongoose;

const QuotationSchema = new Schema({
  date:       { type: Date,    required: true },
  ref:        { type: String,  required: true, unique: true },
  customer:   { type: String,  required: true },
  warehouse:  { type: String,  required: true },
  orderTax:   { type: Number,  default: 0 },
  discount:   { type: Number,  default: 0 },
  shipping:   { type: Number,  default: 0 },
  status:     { type: String,  default: 'Pending' },
  note:       { type: String,  default: '' },
  total:      { type: Number,  required: true }
});

module.exports = mongoose.model('Quotations', QuotationSchema);
