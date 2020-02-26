const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	dateAdded: {
		type: Date,
		default: Date.now,
	},
	canvasToken: {
		type: String,
		required: false,
	},
    defaultStudyLength: {
        type: Number,
        required: false
    },
    defaultBreakLength: {
        type: Number,
        required: false
    },
    defaultTechnique: {
        type: String,
        required: false
    }
});


module.exports = mongoose.model('User', userSchema);
