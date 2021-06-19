const { validationResult } = require("express-validator");
const mongoose = require('mongoose');
const User = require('../models/user');
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
        res.status(200).json({
            message: 'Exercise created successfully!',
            exercise: exercise,
            training: {
                _id: training._id, name: training.name
            },
            user: {
                user: training.user.name,
            },
            exercises: training.exercises
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        };
        next(err);
    }
};

exports.getExercises = async (req, res, next) => {
    try {
        const trainingId = [req.params.trainingId];
        const exercises = await Training.findById(trainingId).select('-user -date -name -_id').populate({
            path: 'exercises',
            model: "Exercise"
        }
    );
        res.status(200).json(exercises.exercises)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        };
        next (err);
    };
};

exports.getExercise = async (req, res, next) => {
    try {
        const exerciseId = req.params.exerciseId;
        const exercise = await Exercise.findById(exerciseId)
        if (!exercise) {
            const error = new Error('Could not find exercise!').select('-_id');
            error.statusCode = 404;
            throw error;
        };
        res.status(200).json(exercise)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        };
        next(err)
    };
};

exports.updateExercise = async (req, res, next) => {
    const exerciseId = req.params.exerciseId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, eneterd data is incorrect');
        error.statusCode = 422;
        throw error;
    };
    const name = req.body.name;
    const series = req.body.series;
    const reps = req.body.reps;
    try {
        const exercise = await Exercise.findById(exerciseId);
        if (!exercise) {
            const error = new Error('Could not find exercise');
            error.statusCode = 404;
            throw error;
        };
        exercise.name = name;
        exercise.series = series;
        exercise.reps = reps;
        const result = await exercise.save();
        res.status(200).json({
            message: 'Exercise updated!',
            exercise: result
        })
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
        await Exercise.findByIdAndRemove(exerciseId);
        const training = await Training.findById(trainingId);
        training.exercises.pull({ _id: exerciseId });
        await training.save();
        res.status(200).json({
            message: 'Deleted exercise',
            exercise: exerciseId
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

