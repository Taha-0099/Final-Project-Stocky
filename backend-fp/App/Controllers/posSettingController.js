const PosSetting = require('../../Models/PosSettingModel');

// GET current POS settings (returns latest or creates default)
exports.getPosSetting = async (req, res) => {
  try {
    let setting = await PosSetting.findOne().sort({ updatedAt: -1 });
    if (!setting) {
      setting = await PosSetting.create({ note: "Thank You For Shopping With Us . Please Come Again" });
    }
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE (or create) POS settings
exports.updatePosSetting = async (req, res) => {
  try {
    let setting = await PosSetting.findOne();
    if (!setting) {
      setting = await PosSetting.create(req.body);
    } else {
      Object.assign(setting, req.body);
      await setting.save();
    }
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
