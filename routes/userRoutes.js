const express = require('express');
const { getAllUsers, registrationController, loginController } = require('../controllers/userController');

// router object 
const router = express.Router();

// Get all user
router.get('/all-users', getAllUsers)


// register user
router.post('/register', registrationController)

// Login user
router.post('/login', loginController)

module.exports = router;