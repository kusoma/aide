const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { graphql, buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./models/user');

const app = express();

app.use(bodyParser.json());

const schema =  `
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        password: String!
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
`

app.use(
    '/api',
    graphqlHttp({
        schema: buildSchema(schema),
        rootValue: {
            createUser: (args) => {
                User.findOne({email: args.userInput.email})
                    .then(user => {
                        if (user) {
                            throw new Error('Email already taken!');
                            return bcrypt.hash(args.userInput.password, 12);
                        }
                    })
                    .then(hashedPassword => {
                        const user = new User({
                            firstName: args.userInput.firstName,
                            lastName: args.userInput.lastName,
                            username: args.userInput.username,
                            email: args.userInput.email,
                            password: args.userInput.password,
                            canvasToken: args.userInput.canvasToken,
                            googleToken: args.userInput.googleToken
                        });
                        return user 
                            .save()
                            .then(result => {
                                console.log(result);
                                return {...result._doc};
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    })
                    .catch(err => {
                        throw err;
                    });
            }
        
        },
        graphiql: true
    })
);

// TODO: connect to mongodb server instead of local
mongoose.connect(`mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`)
.then(() => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})