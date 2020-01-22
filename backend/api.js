const bcrypt = require('bcrypt');
const User = require('./models/user');

module.exports = {
    schema:  `
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        password: String
        canvasToken: String
        googleToken: String
    }

    input UserInput {
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        password: String!
        canvasToken: String
        googleToken: String
    }

    type RootQuery {
        user: User
    }

    type RootMutation {
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `,
    createUser: function (args) {
        return User.findOne({email: args.userInput.email})
            .then(user => {
                if (user) {
                    throw new Error('Email already taken!'); 
                }
                return bcrypt.hash(args.userInput.password, 12);
            })
            .then(hashedPassword => {
                const user = new User({
                    firstName: args.userInput.firstName,
                    lastName: args.userInput.lastName,
                    username: args.userInput.username,
                    email: args.userInput.email,
                    password: hashedPassword,
                });
                return user 
                    .save()
                    .then(result => {
                        console.log(result);
                        return {...result._doc, password: null, _id: result.id};
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                throw err;
            });
    }
}

