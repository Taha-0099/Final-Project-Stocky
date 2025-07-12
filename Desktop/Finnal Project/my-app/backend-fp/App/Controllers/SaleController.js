// /App/Controllers/SaleController.js
const SaleModel = require('../../Models/SaleModel');

module.exports = {
  // GET /Sales
  getAll: (req, res) => {
    SaleModel.find().sort({ date: -1 })
      .then(list => res.status(200).json(list))
      .catch(err => res.status(500).json({ message: 'Error fetching sales', error: err }));
  },

  // POST /Sales
  create: (req, res) => {
    const { date, customer, status = 'pending', note = '', total } = req.body;
    const ref = `SL_${Date.now()}`;
    SaleModel.create({ date, ref, customer, status, note, total })
      .then(sale => res.status(201).json(sale))
      .catch(err => res.status(500).json({ message: 'Error creating sale', error: err }));
  }
};
