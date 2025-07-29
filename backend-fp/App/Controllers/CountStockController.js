const CountStockModel = require('../../Models/CountStockModel');
const Product = require('../../Models/ProductModel');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await CountStockModel.find({});
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.countStock = async (req, res) => {
  const { date, warehouse, category } = req.body;

  try {
    const query = {};
    if (warehouse) query.warehouse = warehouse;
    if (category) query.category = category;

    // Fetch products based on warehouse and category (date filter applied at save)
    const products = await Product.find(query);

    // Generate Excel file
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Stock Report');

    worksheet.columns = [
      { header: 'Product Name', key: 'name', width: 30 },
      { header: 'Code', key: 'code', width: 15 },
      { header: 'Brand', key: 'brand', width: 20 },
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Cost', key: 'cost', width: 10 },
      { header: 'Price', key: 'price', width: 10 },
      { header: 'Unit', key: 'unit', width: 10 },
      { header: 'Quantity', key: 'quantity', width: 10 },
    ];

    products.forEach(prod => {
      worksheet.addRow({
        name: prod.name,
        code: prod.codeProduct,
        brand: prod.brand,
        category: prod.category,
        cost: prod.productCost,
        price: prod.productPrice,
        unit: prod.unit,
        quantity: (prod.openingStock1 || 0) + (prod.openingStock2 || 0)
      });
    });

    const fileName = `stock_export_${Date.now()}.xlsx`;
    const filePath = path.join(__dirname, '../../uploads', fileName);

    if (!fs.existsSync(path.join(__dirname, '../../uploads'))) {
      fs.mkdirSync(path.join(__dirname, '../../uploads'));
    }

    await workbook.xlsx.writeFile(filePath);

    const newStockCount = new CountStockModel({
      date,
      warehouse,
      category: category || '---',
      fileUrl: `/uploads/${fileName}`
    });

    await newStockCount.save();

    res.json({ message: 'Stock counted successfully!', fileUrl: newStockCount.fileUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
