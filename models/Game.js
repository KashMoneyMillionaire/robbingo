'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GameSchema = new Schema({
    active: {
        type: Boolean,
        default: true
    },
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }],
    squares: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Square'
    }]
});

module.exports = mongoose.model('Game', GameSchema);
