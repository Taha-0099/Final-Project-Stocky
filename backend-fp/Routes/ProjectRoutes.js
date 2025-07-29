const express = require('express');
const router = express.Router();
const projectController = require('../App/Controllers/projectController');

// All CRUD routes:
router.get('/', projectController.getAllProjects);
router.post('/', projectController.createProject);
router.delete('/:id', projectController.deleteProject);
// THIS LINE needs updateProject in your controller:
router.put('/:id', projectController.updateProject);

module.exports = router;
