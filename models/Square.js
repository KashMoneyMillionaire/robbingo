'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SquareSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    approved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Square', SquareSchema);
