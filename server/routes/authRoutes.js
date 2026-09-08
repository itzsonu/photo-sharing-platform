const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser); // public route
router.post('/login', loginUser);        // public route

module.exports = router;