const mongoose = require('mongoose');

const AdSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },   
    price: {
        type: String,
        default: 'n/a',
        trim: true   
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    image: {
        type: String
    },
    address: {
        type: String
    },
    ownerId: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const Ad = mongoose.model('Ad', AdSchema);

module.exports = { Ad };
