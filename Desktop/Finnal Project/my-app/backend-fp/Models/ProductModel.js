const mongoose = require('mongoose');
mongoose.pluralize(null);

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name:             { type: String,  required: true },
  imgurl:           { type: String,  required: true },

  barcodeSymbology: { type: String,  required: true },
  codeProduct:      { type: String,  required: true, unique: true },

  category:         { type: String },
  brand:            { type: String },
  unit:             { type: String },
  description:      { type: String },

  productType:      { type: String },
  productCost:      { type: Number,  required: true },
  productPrice:     { type: Number,  required: true },
  saleUnit:         { type: String },
  purchaseUnit:     { type: String },
  stockAlert:       { type: Number },

  warrantyPeriod:   { type: String },
  warrantyTerms:    { type: String },

  openingStock1:    { type: Number },
  openingStock2:    { type: Number },

  hasSerialNumber:  { type: Boolean, default: false },
  notForSelling:    { type: Boolean, default: false }
});

module.exports = mongoose.model('Products', ProductSchema);
