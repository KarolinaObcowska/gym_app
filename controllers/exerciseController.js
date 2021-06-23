const { validationResult } = require("express-validator");
const Training = require('../models/training');
const Exercise = require('../models/exercise');

exports.createExercise = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        const error = new Error('Validation failed, enetered data is incorrect!');
        error.statusCode = 422;
        throw error;
    }
    try {
        const trainingId = req.params.trainingId;
        const name = req.body.name;
        const series = req.body.series;
        const reps = req.body.reps;
        const exercise = new Exercise({
            name: name,
            series: series,
            reps: reps,
        });
        await exercise.save();
        const training = await Training.findById(trainingId);
        training.exercises.push(exercise);
        await training.save();
        res.status(200).json(training.exercises);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        };
        next(err);
    }
};

exports.deleteExercise= async (req, res, next) => {
    const trainingId = req.params.trainingId;
    const exerciseId = req.params.exerciseId;
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
        const error = new Error('Could not find exercise.');
        error.statusCode = 404;
        throw error;
    }
    try {
        const training = await Training.findById(trainingId);
        await Exercise.findByIdAndRemove(exerciseId);
        training.exercises.pull({ _id: exerciseId });
        res.status(200).json(exerciseId)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

