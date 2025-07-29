const Sale = require('../../Models/SaleModel');

module.exports = {
  // Get all sales
  getAllSales: async (req, res) => {
    try {
      const sales = await Sale.find();
      res.json(sales);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Get sale by ID
  getSaleById: async (req, res) => {
    try {
      const sale = await Sale.findById(req.params.id);
      if (!sale) return res.status(404).json({ msg: 'Sale not found' });
      res.json(sale);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Create new sale
  createSale: async (req, res) => {
    try {
      // Calculate totals server-side (safe)
      const { products = [], orderTax = 0, discount = 0, shipping = 0 } = req.body;
      const subtotal = products.reduce((sum, p) => sum + (p.subtotal || 0), 0);
      const orderTaxAmt = (subtotal * Number(orderTax)) / 100;
      const total = subtotal + Number(shipping) - Number(discount) + orderTaxAmt;

      const sale = new Sale({ ...req.body, total });
      await sale.save();
      res.status(201).json(sale);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Update sale by ID
  updateSale: async (req, res) => {
    try {
      const { products = [], orderTax = 0, discount = 0, shipping = 0 } = req.body;
      const subtotal = products.reduce((sum, p) => sum + (p.subtotal || 0), 0);
      const orderTaxAmt = (subtotal * Number(orderTax)) / 100;
      const total = subtotal + Number(shipping) - Number(discount) + orderTaxAmt;

      const sale = await Sale.findByIdAndUpdate(
        req.params.id,
        { ...req.body, total },
        { new: true }
      );
      if (!sale) return res.status(404).json({ message: 'Sale not found' });
      res.json(sale);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Delete sale
  deleteSale: async (req, res) => {
    try {
      const sale = await Sale.findByIdAndDelete(req.params.id);
      if (!sale) return res.status(404).json({ message: 'Sale not found' });
      res.json({ message: 'Sale deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
