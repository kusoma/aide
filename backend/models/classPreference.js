const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classPreferenceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    peers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    classId: {
        type: Number,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    defaultStudyLength: {
        type: Number,
        required: true,
    },
    defaultBreakLength: {
        type: Number,
        required: true,
    },
    defaultTechnique: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('ClassPreference', classPreferenceSchema);
