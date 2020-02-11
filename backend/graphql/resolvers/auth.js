const bcrypt = require('bcrypt');
const User = require('../../models/user');
const StudyPreference = require('../../models/studyPreference');

module.exports = {
    createUser: async args => {
        try {
            if(!args.userInput.firstName)
                throw new Error('Please Provide a First Name');
            if(!/^[a-zA-Z]/.test(args.userInput.firstName))
                throw new Error('First Name cannot contain numbers')
            if(!args.userInput.lastName)
                throw new Error('Please Provide a Last Name');
            if(!/^[a-zA-Z]/.test(args.userInput.lastName))
                throw new Error('Last Name cannot contain numbers')
            if(!args.userInput.email)
                throw new Error('Please Provide an Email!');
            if(!args.userInput.email.includes('@') || !args.userInput.email.includes('.com'))
                throw new Error('Invalid Email!');
            if(!args.userInput.password)
                throw new Error('Please provide a Password!');
            

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
                })
            });
            const result = await user.save();

            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        };
    },
    
    login: async ({ email, password }) => {
        if(!email)
            throw new Error('Please Provde an Email!');
        if(!email.includes("@") || !email.includes(".com"))
            throw new Error('Invalid Email!');
        if(!password)
            throw new Error('Please Provide a Password!');

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

