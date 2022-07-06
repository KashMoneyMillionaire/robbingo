'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BoardSchema = new Schema({
    active: {
        type: Boolean,
        default: true
    },
    squares: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Square'
    }]
});

module.exports = mongoose.model('Square', BoardSchema);
