const bcrypt = require('bcrypt');
const User = require('../../models/user');
const StudyPreference = require('../../models/studyPreference');
const ClassSetting = require('../../models/classSetting');

module.exports = {
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
    },
    addClassSetting: async({ args, req }) => {
        const classSetting = new ClassSetting({
            classNumber: args.ClassSettingInput.classNumber,
            classTitle: args.ClassSettingInput.classTitle,
            testAutomate: args.ClassSettingInput.testAutomate,
            testStudyLength: args.ClassSettingInput.testStudyLength,
            testBreakLength: args.ClassSettingInput.testBreakLength,
            homeworkAutomate: args.ClassSettingInput.homeworkAutomate,
            homeworkStudyLength: args.ClassSettingInput.homeworkStudyLength,
            homeworkBreakLength: args.ClassSettingInput.homeworkBreakLength,
            quizAutomate: args.ClassSettingInput.quizAutomate,
            quizStudyLength: args.ClassSettingInput.quizStudyLength,
            quizBreakLength: quizBreakLength,
            days: [],
            friends: []
        })
        try {
        
    


        } catch (err) {
            throw err;
        }
    }
}
