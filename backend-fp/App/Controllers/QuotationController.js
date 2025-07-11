// /App/Controllers/QuotationController.js
const QuotationModel = require('../../Models/QuotationModel');

module.exports = {
  // GET /Quotations
  getAll: (req, res) => {
    QuotationModel.find().sort({ date: -1 })
      .then(qs => res.status(200).json(qs))
      .catch(err => res.status(500).json({ message: 'Error fetching quotations', error: err }));
  },

  // POST /Quotations
  create: (req, res) => {
    // auto-generate a ref if none in payload
    const { date, customer, warehouse, orderTax, discount, shipping, status, note, total } = req.body;
    const ref = `QT_${Date.now()}`;
    QuotationModel.create({ date, ref, customer, warehouse, orderTax, discount, shipping, status, note, total })
      .then(q => res.status(201).json(q))
      .catch(err => res.status(500).json({ message: 'Error creating quotation', error: err }));
  }
};
