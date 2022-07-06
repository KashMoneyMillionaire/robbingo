'use strict';

import mongoose from 'mongoose';
const { Schema, model } = mongoose;

var GameSchema = new Schema({
    active: {
        type: Boolean,
        default: true
    },
    boards: [{
        type: Schema.Types.ObjectId,
        ref: 'Board'
    }],
    squares: [{
        type: Schema.Types.ObjectId,
        ref: 'Square'
    }]
});

export default model('Game', GameSchema);
