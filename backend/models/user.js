const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
<<<<<<< HEAD
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
	date_added: {
		type: Date,
		default: Date.now,
	},
	canvasToken: {
		type: String,
		required: false,
	},
	googleToken: {
		type: String,
		required: false,
	},
	studyPreference: {
		type: Schema.Types.ObjectId,
		ref: 'StudyPreference',
	},
});
=======
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
    }
})
>>>>>>> feature/015-google-backend

module.exports = mongoose.model('User', userSchema);
