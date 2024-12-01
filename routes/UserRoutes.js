const express = require('express');
const UserController = require('../controller/UserController');
const router = express.Router();

// Routes untuk CRUD User (menggunakan no_telp sebagai identifier)
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:no_telp', UserController.getUserByNoTelp); // Diganti ke no_telp
router.put('/users/:no_telp', UserController.updateUser); // Diganti ke no_telp
router.delete('/users/:no_telp', UserController.deleteUser); // Diganti ke no_telp

module.exports = router;
