const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true

    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    canvasToken: {
        type: String,
        required: false
    },
    studyPreference: {
        type: Schema.Types.ObjectId,
        ref: 'StudyPreference'
    },
    classSetting: [{
        type: Schema.Types.ObjectId,
        ref: 'ClassSetting'
    }]
})

module.exports = mongoose.model('User', userSchema);