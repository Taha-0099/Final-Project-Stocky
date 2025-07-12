// /App/Controllers/CreatePurchaseController.js
const CreatePurchaseModel = require('../../Models/CreatePurchaseModel');

module.exports = {
  // GET /CreatePurchase
  getAll: async (req, res) => {
    try {
      const list = await CreatePurchaseModel.find().sort({ date: -1 });
      res.status(200).json(list);
    } catch (err) {
      console.error('Error fetching create-purchases:', err);
      res.status(500).json({ message: 'Error fetching purchases', error: err.message });
    }
  },

  // POST /CreatePurchase
  create: async (req, res) => {
    try {
      // auto-generate ref
      const ref = `PR_${Date.now()}`;
      const {
        date, supplier, warehouse,
        orderTax = 0, discount = 0, shipping = 0,
        status = 'pending', note = '',
        total, paid = 0
      } = req.body;

      const due = total - paid;
      const paymentStatus = paid === 0
        ? 'Unpaid'
        : paid < total
          ? 'Partial'
          : 'Paid';

      const cp = await CreatePurchaseModel.create({
        date, ref, supplier, warehouse,
        orderTax, discount, shipping,
        status, note, total, paid, due, paymentStatus
      });

      res.status(201).json(cp);
    } catch (err) {
      console.error('Error creating create-purchase:', err.message);
      const status = err.name === 'ValidationError' ? 400
                   : err.code === 11000           ? 409
                   : 500;
      res.status(status).json({ message: 'Error creating purchase', error: err.message });
    }
  }
};
