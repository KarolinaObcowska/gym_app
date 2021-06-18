const express = require('express');
const { check } = require('express-validator');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    check('name')
        .trim()
        .not()
        .isEmpty(),
    check('password')
        .trim()
        .isLength({ min: 8 })
], authController.signup);

 router.post('/login', [
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Please enter a password with 8 or more characters')
        .isLength({ min: 8 })
], authController.login);

module.exports = router;