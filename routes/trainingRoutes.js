const express = require('express');
const { check } = require('express-validator');

const trainingController = require('../controllers/trainingController');
const exerciseController = require('../controllers/exerciseController');
const isAuth = require('../middleware/isAuth');
const router = express.Router();

router.get('/', isAuth, trainingController.getTrainings);
router.post('/', isAuth, trainingController.createTraining);
router.get('/:trainingId', isAuth, trainingController.getTraining);
router.put('/:trainingId', isAuth, trainingController.updateTraining);
router.delete('/:trainingId', isAuth, trainingController.deleteTraining);

router.post('/:trainingId/exercise', isAuth, exerciseController.createExercise);
router.delete('/:trainingId/exercise/:exerciseId', isAuth, exerciseController.deleteExercise);

module.exports = router;