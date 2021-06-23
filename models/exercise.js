const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    series: {
        type: Number,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Exercise', exerciseSchema);