const express = require('express');
const router = express.Router();
const controller = require('../App/Controllers/posSettingController');

router.get('/', controller.getPosSetting);
router.post('/', controller.updatePosSetting);

module.exports = router;
