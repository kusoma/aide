const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
	setCanvasToken: async ({ userId, canvasToken }) => {
		try {
			const user = await User.findById({ _id: userId });
			if (!user) {
				throw new Error('User does not exist!');
			}
			const hashedToken = await bcrypt.hash(canvasToken, 12);
			const result = await User.findByIdAndUpdate({ _id: userId }, { canvasToken: canvasToken }, { new: true }).catch(err => {
				throw err;
			});

			return { ...result._doc, canvasToken: canvasToken, password: null };
		} catch (err) {
			throw err;
		}
	},

	setUserSettings: async ({ userID, firstName, lastName }) => {
		try {
			const user = await User.findById({ _id: userID });
			if (!user) {
				throw new Error('User does not exist!');
			}

			// TODO: There is probably a better way
			const result = await User.findByIdAndUpdate(
				{ _id: userID },
				{
					firstName: firstName,
					lastName: lastName,
				},
				{ new: true },
			).catch(err => {
				throw err;
			});

			return { ...result._doc, password: null };
		} catch (err) {
			throw err;
		}
	},

	setStudyPreference: async ({ userID, defaultStudyLength, defaultBreakLength, defaultTechnique }) => {
		try {
			const user = await User.findById({ _id: args.userId });
			if (!user) {
				throw new Error('User does not exist!');
			}

			// TODO: There is probably a better way
			const result = await User.findByIdAndUpdate(
				{ _id: args.userId },
				{
					defaultStudyLength: args.defaultStudyLength,
					defaultBreakLength: args.defaultBreakLength,
					defaultTechnique: args.defaultTechnique,
				},
				{ new: true },
			).catch(err => {
				throw err;
			});

			return { ...result._doc, password: null };
		} catch (err) {
			throw err;
		}
	},
	getUser: async userId => {
		try {
			return User.findById(userId);
		} catch (err) {
			return err;
		}
	},
};
