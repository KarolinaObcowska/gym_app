const { validationReulst, validationResult } = require('express-validator');
const Training = require('../models/training');
const User = require('../models/user');

exports.getTrainings = async(req, res, next) => {
    try {
        const trainings = await Training.find().where('user._id').in(req.user.id)
            .sort({ date: -1 })
            .populate({
                path: 'exercises',
                model: "Exercise"
            }
        );
        res.status(200).json({
            message: 'Fetched trainings successfully',
            pageTitle: 'Trainings',
            trainings: trainings
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        };
        next(err);
    }
};

exports.getTraining = async(req, res, next) => {
    const trainingId = req.params.trainingId;
    const training = await Training.findById(trainingId)
        .populate({
            path: 'exercises',
            model: "Exercise"
        });
    try {
        if (!training) {
            const error = new Error("could not find training!");
            error.statusCode = 404;
            throw error;
        };
        res.status(200).json({
            message: 'Training fetched!',
            training: training,
            exercises: training.exercises,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        };
        next(err);
    }
    next();
};

exports.createTraining = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect!');
        error.statusCode = 422;
        throw error;
    }
    try {
        const name = req.body.name;
        const userId = req.user.id;
        const training = new Training({
            name: name,
            user: userId
        });
        await training.save();
        res.status(200).json(training);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        };
        next(err);
    }
};

exports.updateTraining = async(req, res, next) => {
    const trainingId = req.params.trainingId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error;
    }
    const userId = '60b66212fa8a82fe804c9654';
    const name = req.body.name;
    try {
        const training = await Training.findById(trainingId);
        if (!training) {
            const error = new Error('Could not find training!');
            error.statusCode = 404;
            throw error;
        };
        if (training.user._id.toString() !== userId) {
            const error = new Error('Not authorized');
            error.statusCode = 403;
            throw error;
        };
        training.name = name;
        const result = await training.save();
        res.status(200).json({
            message: 'Training updated!',
            training: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        };
        next(err);
    }
};

exports.deleteTraining = async(req, res, next) => {
    const userId = req.user.id;
    const trainingId = req.params.trainingId;
    const training = await Training.findById(trainingId);
    if (!training) {
        const error = new Error('Could not find training!');
        error.statusCode = 404;
        throw error;
    }
    if (training.user._id.toString() !== userId.toString()) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
    };
    try {
        await Training.findByIdAndRemove(trainingId);
        const user = await User.findById(userId);
        user.trainings.pull(trainingId);
        await user.save();
        res.status(200).json({
            message: 'Delete training',
            training: trainingId
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        };
        next(err);
    }
}