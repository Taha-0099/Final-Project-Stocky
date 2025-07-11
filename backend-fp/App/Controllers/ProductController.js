// /App/Controllers/ProductController.js
const ProductModel = require('../../Models/ProductModel');

module.exports = {
  // create a new product
  create: async (req, res) => {
    console.log('📝 Create payload:', req.body);
    try {
      const created = await ProductModel.create(req.body);
      return res.status(201).json({ message: "Product created successfully", product: created });
    } catch (err) {
      console.error('❌ Error creating product:', err.message);
      // Send back only the error message so the client can show it
      const status = err.name === 'ValidationError' ? 400 :
                     err.code === 11000             ? 409 : 500;
      return res
        .status(status)
        .json({ message: "Error creating product", error: err.message });
    }
  },

  // get all products
  getAll: (req, res) => {
    ProductModel.find()
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).json({ message: "Error fetching products", error: err }));
  },

  // get a single product by its ID
  getSingle: (req, res) => {
    ProductModel.findById(req.params.Product_id)
      .then(prod => {
        if (!prod) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(prod);
      })
      .catch(err => res.status(500).json({ message: "Error fetching product", error: err }));
  },

  // update a product by its ID
  updateProduct: (req, res) => {
    ProductModel.findByIdAndUpdate(req.params.Product_id, req.body, { new: true })
      .then(updated => {
        if (!updated) return res.status(404).json({ message: "Product not found to update" });
        res.status(200).json({ message: "Product updated successfully" });
      })
      .catch(err => res.status(500).json({ message: "Error updating product", error: err }));
  },

  // delete a product by its ID
  deleteProduct: (req, res) => {
    ProductModel.findByIdAndDelete(req.params.Product_id)
      .then(deleted => {
        if (!deleted) return res.status(404).json({ message: "Product not found to delete" });
        res.status(200).json({ message: "Product deleted successfully" });
      })
      .catch(err => res.status(500).json({ message: "Error deleting product", error: err }));
  }
};
