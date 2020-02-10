const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
	startTime: {
		type: Date,
		required: true
	},
	endTime: {
		type: Date,
		required: true
	},
	technique: {
		type: String,
		required: true
	},
	owner: {
		type: Schema.Types.ObjectId,
		required: true
	}
});

module.exports = mongoose.model('Session', sessionSchema);
