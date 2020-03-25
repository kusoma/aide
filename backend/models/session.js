const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
	startTime: {
		type: Date,
		required: true,
	},
	endTime: {
		type: Date,
		required: true,
	},
	breakTime: {
		type: Number,
		required: true,
	},
	timeToBreak: {
		type: Number,
		required: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		required: true,
	},
});

module.exports = mongoose.model('Session', sessionSchema);
