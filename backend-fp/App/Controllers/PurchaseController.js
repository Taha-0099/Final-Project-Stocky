const PurchaseModel = require('../../Models/PurchaseModel');

module.exports = {
  // GET /Purchases
  getAll: (req, res) => {
    PurchaseModel.find()
      .sort({ date: -1 })
      .then(list => res.status(200).json(list))
      .catch(err => res.status(500).json({ message: 'Error fetching purchases', error: err }));
  },

  // POST /Purchases
  create: (req, res) => {
    const {
      date, supplier, warehouse,
      orderTax = 0, discount = 0, shipping = 0,
      status = 'pending', note = '', total, paid = 0
    } = req.body;

    const ref = `PR_${Date.now()}`;
    const due = total - paid;

    PurchaseModel.create({
      date, ref, supplier, warehouse,
      orderTax, discount, shipping, status,
      note, total, paid, due,
      paymentStatus: paid === 0 ? 'Unpaid' : (paid < total ? 'Partial' : 'Paid')
    })
    .then(p => res.status(201).json(p))
    .catch(err => res.status(500).json({ message: 'Error creating purchase', error: err }));
  },

  // PUT /Purchases/:id  ← NEW: update a purchase
  update: (req, res) => {
    PurchaseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    .then(updated => {
      if (!updated) return res.status(404).json({ message: "Purchase not found" });
      res.status(200).json(updated);
    })
    .catch(err => res.status(500).json({ message: "Error updating purchase", error: err }));
  },

  // DELETE /Purchases/:id  ← NEW: delete a purchase
  delete: (req, res) => {
    PurchaseModel.findByIdAndDelete(req.params.id)
      .then(deleted => {
        if (!deleted) return res.status(404).json({ message: "Purchase not found" });
        res.status(200).json({ message: "Purchase deleted" });
      })
      .catch(err => res.status(500).json({ message: "Error deleting purchase", error: err }));
  }
};
