const bcrypt = require('bcrypt');
const User = require('../../models/user');
const StudyPreference = require('../../models/studyPreference');

module.exports = {
    setGoogleToken: async ({ userID, googleToken }) => {
        try {
            const user = await User.findById({ _id: userID })
            if (!user) {
                throw new Error('User does not exist!');
            }
            const hashedToken = await bcrypt.hash(googleToken, 12);
            const result = await User.findByIdAndUpdate(
                { '_id': userID },
                { 'googleToken': hashedToken },
                { new: true })
                .catch(err => {
                    throw err;
                });

            return { ...result._doc, googleToken: null, canvasToken: null, password: null }
        } catch (err) {
            throw err;
        }
    },
    setCanvasToken: async ({ userID, canvasToken }) => {
        try {
            const user = await User.findById({ _id: userID })
            if (!user) {
                throw new Error('User does not exist!');
            }
            const hashedToken = await bcrypt.hash(canvasToken, 12);
            const result = await User.findByIdAndUpdate(
                { '_id': userID },
                { 'canvasToken': hashedToken },
                { new: true })
                .catch(err => {
                    throw err;
                });

            return { ...result._doc, googleToken: null, canvasToken: null, password: null }
        } catch (err) {
            throw err;
        }
    },
    setStudyPreference: async ({ userID, studyPreferenceInput }) => {
        try {
            const user = await User.findById({ _id: userID })
            if (!user) {
                throw new Error('User does not exist!')
            }

            // TODO: There is probably a better way
            user.studyPreference.studyLength = studyPreferenceInput.studyLength
            user.studyPreference.breakLength = studyPreferenceInput.breakLength
            user.studyPreference.technique = studyPreferenceInput.technique

            const result = await user.save();

            return { ...result.studyPreference }
        } catch (err) {
            throw err;
        }
    }
}