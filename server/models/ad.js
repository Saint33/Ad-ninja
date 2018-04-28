const mongoose = require('mongoose');

const AdSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },   
    price: {
        type: String,
        default: 'n/a'   
    },
    description: {
        type: String
    },
    category: {
        type: String
    }
}, {timestamps: true});

const Ad = mongoose.model('Ad', AdSchema);

module.exports = { Ad };
