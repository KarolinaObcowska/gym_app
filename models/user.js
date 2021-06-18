const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    bio: {
        type: String
    },
    social: {
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    goalCard: [
        {   
            actualWeight: {
                type: Number
            },
            goalWeight: {
                type: Number
            },
            height: {
                type: Number
            },
            kcal: {
                type: Number
            },
            trainingRate: {
                type: Number
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);