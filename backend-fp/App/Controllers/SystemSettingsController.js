const SystemSettings = require('../../Models/SystemSettingsModel');

// GET system settings
exports.getSettings = async (req, res) => {
  try {
    let settings = await SystemSettings.findOne();
    if (!settings) {
      // Create default if none exists
      settings = await SystemSettings.create({
        companyName: "Stocky",
        footer: "Stocky - Ultimate Inventory With POS",
        address: "3618 Abia Martin Drive",
        email: "admin@example.com",
        phone: "6315996770",
        developedBy: "Stocky"
      });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE system settings (supports logo upload)
exports.updateSettings = async (req, res) => {
  try {
    let data = req.body;
    if (req.file && req.file.path) {
      data.logo = req.file.path.replace(/\\/g, '/'); // Normalize for Windows
    }
    // FIX: remove _id so Mongo doesn't complain
    delete data._id;

    let settings = await SystemSettings.findOneAndUpdate({}, data, { new: true, upsert: true });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Clear cache (placeholder)
exports.clearCache = (req, res) => {
  res.json({ success: true, message: "Cache cleared!" });
};
