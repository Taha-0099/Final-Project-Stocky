
// backend-fp/server.js
const express       = require("express");
const cors          = require("cors");
const bodyParser    = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database connection
require("./Database/Connection");

// Route imports
const userRoutes           = require("./Routes/UserRoutes");
const QuotationRoutes      = require("./Routes/QuotationRoutes");
const ProductRoutes        = require("./Routes/ProductRoutes");
const PurchaseRoutes       = require("./Routes/PurchaseRoutes");
const SaleRoutes           = require("./Routes/SaleRoutes");
const CreatePurchaseRoutes = require("./Routes/CreatePurchaseRoutes");
const StatsRoutes          = require("./Routes/StatsRoutes");
const EmployeeRoutes       = require("./Routes/EmployeeRoutes");
const CompanyRoutes        = require("./Routes/CompanyRoutes");
const DepartmentRoutes     = require("./Routes/DepartmentRoutes");

// Mount routes
app.use("/Products",      ProductRoutes);
app.use("/Quotations",    QuotationRoutes);
app.use("/Purchases",     PurchaseRoutes);
app.use("/Sales",         SaleRoutes);
app.use("/CreatePurchase",CreatePurchaseRoutes);
 app.use("/api/stats", StatsRoutes);
 app.use("/Users",         userRoutes);
app.use("/Employees",     EmployeeRoutes);
app.use("/Companies",     CompanyRoutes);
app.use("/Departments",   DepartmentRoutes);

// Start server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
