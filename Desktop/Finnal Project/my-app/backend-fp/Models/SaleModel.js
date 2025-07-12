// /Models/SaleModel.js
const mongoose = require('mongoose');
mongoose.pluralize(null);
const { Schema } = mongoose;

const SaleSchema = new Schema({
  date:    { type: Date,   required: true },
  ref:     { type: String, required: true, unique: true },
  customer:{ type: String, required: true },
  status:  { type: String, default: 'pending' },
  note:    { type: String, default: '' },
  total:   { type: Number, required: true }
});

module.exports = mongoose.model('Sales', SaleSchema);
