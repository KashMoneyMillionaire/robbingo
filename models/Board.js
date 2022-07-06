
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

var BoardSchema = new Schema({
    active: {
        type: Boolean,
        default: true
    },
    squares: [{
        type: Schema.Types.ObjectId,
        ref: 'Square'
    }]
});

export default model('Square', BoardSchema);
