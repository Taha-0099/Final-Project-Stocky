const mongoose = require('mongoose');

const CountStockSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  warehouse: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: '---'
  },
  fileUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('CountStock', CountStockSchema);
