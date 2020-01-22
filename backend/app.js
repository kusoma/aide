const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { graphql, buildSchema } = require('graphql');
const mongoose = require('mongoose');

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
    }

    input UserInput {
        firstName: String!
        lastName: String!
        username!
        email: String!
        password: String!
    }

    type RootQuery {
        user(email: String): User
    }

    type RootMutation {
        createUser(userInput: UserInput): User
    }
`

app.use(
    '/api',
    graphqlHttp({
        schema: buildSchema(schema),
        rootValue: {
            createUser: (args) => {
                const user = new User({
                    firstName: args.userInput.firstName,
                    lastName: args.userInput.lastName,
                    username: args.user.username,
                    email: args.userInput.email,
                    password: args.userInput.password
                })
                return user 
                    .save()
                    .then(result => {
                        console.log(result);
                        return {...result._doc};
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    })
);

mongoose.connect()
.then(() => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})