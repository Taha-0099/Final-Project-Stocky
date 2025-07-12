const express = require('express');
const router = express.Router();
const { createDepartment, getDepartments } = require('../App/Controllers/DepartmentController');

router.post('/create', createDepartment);
router.get('/', getDepartments);

module.exports = router;
