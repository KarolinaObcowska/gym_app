const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../middleware/isAuth');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/me', isAuth, userController.getMe);

router.delete('/:id', isAuth, userController.deleteAccount)

router.post('/', isAuth, userController.updateAccount);

router.put('/goalcard', isAuth, userController.addGoalCard)

router.delete('/goalcard/:id', isAuth, userController.deleteGoalCard)

module.exports = router;

