// backend-fp/Routes/StatsRoutes.js
const express = require("express");
const router  = express.Router();
const stats   = require("../App/Controllers/StatsController");

// Unified stats endpoint
router.get("/", stats.getStats);

module.exports = router;
