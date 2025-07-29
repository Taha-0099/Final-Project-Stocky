// backend-fp/Routes/UserRoutes.js

const express        = require('express');
const router         = express.Router();
const userController = require('../App/Controllers/UserController');

// these paths all get mounted under "/Users"
router.post('/register',   userController.register);
router.post('/login',      userController.login);
router.get( '/verifyToken', userController.verifyToken);
router.get('/all', userController.getAll);
router.patch('/update/:id', userController.update);
router.delete('/delete/:id', userController.delete);

module.exports = router;
