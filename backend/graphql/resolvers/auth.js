const bcrypt = require('bcrypt');
const User = require('../../models/user');
const StudyPreference = require('../../models/studyPreference');

module.exports = {
    createUser: async args => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email })
            if (existingUser) {
                throw new Error('Email already taken!');
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                email: args.userInput.email,
                password: hashedPassword,
                // Create new StudyPreference 
                studyPreference: new StudyPreference({
                    studyLength: args.userInput.studyPreference.studyLength,
                    breakLength: args.userInput.studyPreference.breakLength,
                    technique: args.userInput.studyPreference.technique
                }),
                classSetting: undefined
            });
            const result = await user.save();

            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        };
    },
    
    login: async ({ email, password }) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Incorrect password!');
        }
        return user;
    }
}

