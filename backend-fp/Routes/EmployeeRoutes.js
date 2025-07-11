const express = require('express');
const router = express.Router();
const EmployeeController = require('../App/Controllers/EmployeeController');

router.post('/add', EmployeeController.createEmployee);
router.get('/all', EmployeeController.getEmployees);

module.exports = router;
