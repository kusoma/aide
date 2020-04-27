const User = require('../../models/user');
const ClassPreference = require('../../models/classPreference');

module.exports = {
	createClassPreferences: async args => {
		const classPreference = new ClassPreference({
			classId: args.classPreferenceInput.classId,
			className: args.classPreferenceInput.className,
			defaultStudyLength: args.classPreferenceInput.defaultStudyLength,
			defaultBreakLength: args.classPreferenceInput.defaultBreakLength,
			defaultTechnique: args.classPreferenceInput.defaultTechnique,
			user: args.classPreferenceInput.user,
			peers: args.classPreferenceInput.peers,
		});

		try {
			const existingClass = await ClassPreference.findOne({ classID: args.classPreferenceInput.classID, user: args.classPreferenceInput.user });
			if (existingClass) {
				return existingClass;
			}
			const result = await classPreference.save();
			const user = await User.findById(args.classPreferenceInput.user);

			if (!user) {
				throw new Error('User does not exist');
			}

			user.classPreferences.push(result._id);
			await user.save();

			return { ...result._doc };
		} catch (err) {
			throw err;
		}
	},
	deleteClassPreferences: async ({ userId, classPreferenceId }) => {
		try {
			await User.findByIdAndUpdate({ _id: userId }, { $pull: { classPreferences: classPreferenceId } });

			const response = await ClassPreference.findOneAndDelete(classPreferenceId);

			return { ...response._doc };
		} catch (err) {
			throw err;
		}
	},
	classPreferencesExists: async (userId, classId) => {
		try {
			return await ClassPreference.findOne({
				user: userId,
				classId: classId,
			});
		} catch (err) {
			throw err;
		}
	},
};
