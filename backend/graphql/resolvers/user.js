const bcrypt = require('bcrypt');
const User = require('../../models/user');
const StudyPreference = require('../../models/studyPreference');

module.exports = {
    setGoogleToken: async({userID, googleToken}) => {
        try {
            const user = await User.findOne({_id: userID})
            if (!user) {
                throw new Error('User does not exist!');
            }
            const hashedToken = await bcrypt.hash(googleToken, 12);
            const result = await User.findOneAndUpdate(
                {'_id': userID},
                {'googleToken': hashedToken},
                {new: true})
            .catch(err => {
                throw err;
            });
            
            return {...result._doc, googleToken: null, canvasToken: null, password: null}
        } catch (err) {
            throw err;
        }
    },
    setCanvasToken: async({userID, canvasToken}) => {
        try {
            const user = await User.findOne({_id: userID})
            if (!user) {
                throw new Error('User does not exist!');
            }
            const hashedToken = await bcrypt.hash(canvasToken, 12);
            const result = await User.findOneAndUpdate(
                {'_id': userID},
                {'canvasToken': hashedToken},
                {new: true})
            .catch(err => {
                throw err;
            });

            return {...result._doc, googleToken: null,  canvasToken: null, password: null}
        } catch (err) {
            throw err;
        }
    },
    setStudyPreference: async args => {
        try {
            const user = await User.findOne({_id: args.userID})
            if (!user) {
                throw new Error('User does not exist!')
            }
            console.log(args);
            user.studyPreference = new StudyPreference({
                studyLength: args.studyPreferenceInput.studyLength,
                breakLength: args.studyPreferenceInput.breakLength,
                technique: args.studyPreferenceInput.technique
            });
            const result = await user.save();
            console.log(result);
            return {...result._doc}
        } catch (err) {
            throw err;
        }
    }
}