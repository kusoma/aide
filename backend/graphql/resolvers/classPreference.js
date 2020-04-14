const User = require('../../models/user')
const ClassPreference = require('../../models/classPreference')

module.exports = {
    createClassPreferences: async args => {
        const classPreference = new ClassPreference({
            classID: args.classPreferenceInput.classID,
            className: args.classPreferenceInput.className,
            defaultStudyLength: args.classPreferenceInput.defaultStudyLength,
            defaultBreakLength: args.classPreferenceInput.defaultBreakLength,
            defaultTechnique: args.classPreferenceInput.defaultTechnique,
            user: args.classPreferenceInput.user
        })

        try {
            const result = await classPreference.save();
            const user = await User.findById(args.classPreferenceInput.user);

            if (!user) {
                throw new Error("User does not exist");
            }

            user.classPreferences.push(result._id)
            await user.save();

            return {...result._doc};
        } catch (err) {
            throw err;
        }
    },
    deleteClassPreferences: async ({userID, classPreferenceID}) => {
        try {
            await User.findByIdAndUpdate(
                { _id: userID},
                { $pull: { 'classPreferences': classPreferenceID } }
            );

            const response = await ClassPreference.findOneAndDelete(classPreferenceID);

            return {...response._doc};
        } catch (err) {
            throw err;
        }
    }
}