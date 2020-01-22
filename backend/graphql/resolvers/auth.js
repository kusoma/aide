const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
    createUser: async args => {
        try {
            const existingUser = await User.findOne({email: args.userInput.email})
            if (existingUser) {
                throw new Error('Email already taken!'); 
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                username: args.userInput.username,
                email: args.userInput.email,
                password: hashedPassword,
            });
            const result = await user.save();
            
            return {...result._doc, password: null, _id: result.id};
        } catch(err) {
            throw err;
        };
    }
}

