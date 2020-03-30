const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    isQuiz: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("Events", eventSchema);
