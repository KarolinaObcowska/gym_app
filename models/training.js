const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trainingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Exercise'
        }
    ],
});

module.exports = mongoose.model('Training', trainingSchema);