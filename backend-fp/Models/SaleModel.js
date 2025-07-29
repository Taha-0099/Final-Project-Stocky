const mongoose = require('mongoose');
mongoose.pluralize(null);
const { Schema } = mongoose;

const ProductInSaleSchema = new Schema({
  name:     { type: String, required: true },
  quantity: { type: Number, required: true },
  price:    { type: Number } // Optional
}, { _id: false });

const SaleSchema = new Schema({
  date:    { type: Date,   required: true },
  ref:     { type: String, required: true, unique: true },
  customer:{ type: String, required: true },
  status:  { type: String, default: 'pending' },
  note:    { type: String, default: '' },
  total:   { type: Number, required: true },
  paid:    { type: Number, default: 0 },
  products:[ProductInSaleSchema]
});

module.exports = mongoose.model('Sales', SaleSchema);
