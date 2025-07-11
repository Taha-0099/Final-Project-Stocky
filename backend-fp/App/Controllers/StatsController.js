// backend-fp/App/Controllers/StatsController.js
const Sale = require("../../Models/SaleModel");
const User = require("../../Models/UserModel");  // Changed CustomerModel → UserModel
const Product = require("../../Models/ProductModel");
const Purchase = require("../../Models/PurchaseModel");

// Helper: Weekly data aggregation
const getWeeklyStats = async () => {
  return await Sale.aggregate([
    {
      $group: {
        _id: { $week: "$createdAt" },
        sales: { $sum: "$amount" },
        purchases: { $sum: "$purchaseAmount" },
        date: { $first: "$createdAt" }
      }
    },
    { $sort: { date: 1 } },
    { $limit: 7 },
    {
      $project: {
        _id: 0,
        date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        sales: 1,
        purchases: 1
      }
    }
  ]);
};

// Helper: Top selling products
const getTopProducts = async () => {
  return await Sale.aggregate([
    { $unwind: "$products" },
    {
      $group: {
        _id: "$products.productId",
        value: { $sum: "$products.quantity" }
      }
    },
    { $sort: { value: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product"
      }
    },
    { $unwind: "$product" },
    { $project: { _id: 0, name: "$product.name", value: 1 } }
  ]);
};

exports.getStats = async (req, res) => {
  try {
    const [weekly, topProducts, paymentSalesAgg, recentSales, topCustomers, stockAlert] = await Promise.all([
      getWeeklyStats(),
      getTopProducts(),
      Sale.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]),
      Sale.find().sort({ createdAt: -1 }).limit(10),
      Sale.aggregate([
        { $group: { _id: "$userId", total: { $sum: "$amount" } } },
        { $sort: { total: -1 } }, { $limit: 5 },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user"
          }
        },
        { $unwind: "$user" },
        { $project: { _id: 0, name: "$user.name", total: 1 } }
      ]),
      Product.find({ quantity: { $lte: 5 } })
    ]);

    console.log("Weekly:", weekly);
    console.log("Top Products:", topProducts);
    console.log("Recent Sales:", recentSales);
    console.log("Top Customers:", topCustomers);
    console.log("Stock Alerts:", stockAlert);

    const purchaseTotal = await Purchase.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const paymentSales = paymentSalesAgg[0]?.total || 0;

    res.json({
      summary: {
        sales: paymentSales,
        purchases: purchaseTotal[0]?.total || 0,
        salesReturn: 0,
        purchaseReturn: 0
      },
      weekly,
      topProducts,
      paymentSalesData: weekly.map(w => ({
        date: w.date,
        sale: w.sales,
        purchase: w.purchases
      })),
      recentSales,
      topCustomers,
      stockAlert
    });
  } catch (err) {
    console.error("Stats error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
