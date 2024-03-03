const path = require('path');
const passport = require('passport');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userController = require(path.join(__dirname, '..', 'controller', 'userController'));

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);

module.exports = router;