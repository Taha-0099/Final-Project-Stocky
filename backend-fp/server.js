const express       = require("express");
const cors          = require("cors");
const bodyParser    = require("body-parser");
const path          = require("path");

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
const saleRoutes           = require('./Routes/SaleRoutes');
const CreatePurchaseRoutes = require("./Routes/CreatePurchaseRoutes");
const StatsRoutes          = require("./Routes/StatsRoutes");
const EmployeeRoutes       = require("./Routes/EmployeeRoutes");
const CompanyRoutes        = require("./Routes/CompanyRoutes");
const DepartmentRoutes     = require("./Routes/DepartmentRoutes");
const countStockRoutes     = require('./Routes/CountStockRoutes');
const settingsRoutes = require('./Routes/SystemSettingsRoutes'); 
const projectRoutes        = require('./Routes/ProjectRoutes');

// >>>>>>>> ADD FOR LANGUAGES <<<<<<<<
const languageRoutes = require('./Routes/LanguageRoutes');
// <<<<<<<< END ADD <<<<<<<<

// ADD THIS IMPORT (fixes your error)
const posSettingRoutes = require('./Routes/posSettingRoutes'); // <--- FIX HERE

// Mount routes
app.use('/uploads', express.static('uploads'));
app.use('/CountStock', countStockRoutes);
app.use("/Products",      ProductRoutes);
app.use("/Quotations",    QuotationRoutes);
app.use("/Purchases",     PurchaseRoutes);
app.use('/', saleRoutes); 
app.use("/CreatePurchase",CreatePurchaseRoutes);
app.use("/api/stats",     StatsRoutes);
app.use("/Users",         userRoutes);
app.use('/api/settings', posSettingRoutes);          // <-- KEEP THIS (mounts your POS settings backend API)
app.use("/Employees",     EmployeeRoutes);
app.use("/Companies",     CompanyRoutes);
app.use("/Departments",   DepartmentRoutes);
// app.use('/api/settings', systemSettingsRoutes);    // <-- REMOVE or change this line if you want a different API path
app.use('/api/projects', projectRoutes);
// >>>>>>>> MOUNT LANGUAGES ROUTE <<<<<<<<
app.use('/api/languages', languageRoutes);// <<<<<<<< END MOUNT <<<<<<<<
app.use('/api/settings', settingsRoutes);
// Serve static files (uploaded logos/flags/etc)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
