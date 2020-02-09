const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSettingsSchema = new Schema({
    classNumber: {
        type: String,
        required: true
    },
    classTitle: {
        type: String,
        required: true
    },
    testAutomate: {
        type: Boolean,
        required: true
    },
    testStudyLength: {
        type: Boolean,
        required: true
    },
    testBreakLength: {
        type: Number,
        required: true
    },
    homeworkAutomate: {
        type: Boolean,
        required: true
    },
    homeworkStudyLength: {
        type: Number,
        required: true
    },
    homeworkBreakLength: {
        type: Number,
        required: true
    },
    quizAutomate: {
        type: Boolean,
        required: true
    },
    quizStudyLength: {
        type: Number,
        required: true
    },
    quizBreakLength: {
        type: Number,
        required: true
    },
    days: [{
        type: Number,
        required: false
    }],
    friends: [{
        type: String,
        required: false
    }]
})

module.exports = mongoose.model('ClassSetting', classSettingsSchema);