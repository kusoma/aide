const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studyPreferenceSchema = new Schema({
    studyLength: {
        type: Number,
        required: true
    },
    breakLength: {
        type: Number,
        required: true
    },
    technique: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('StudyPreference', studyPreferenceSchema);