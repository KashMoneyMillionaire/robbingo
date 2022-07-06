
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

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

export default model('Square', SquareSchema);
