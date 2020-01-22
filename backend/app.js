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
        email: String!
        password: String!
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    type RootQuery {
        user: User!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`

// app.use('/', (req, res, next) => {
//     res.send('working api');
// })


app.use(
    '/graphql',
    graphqlHttp({
        schema: buildSchema(schema),
        rootValue: {
            user: () => {
                return null;
            },
            createUser: (args) => {
                const user = new User({
                    firstName: args.userInput.firstName,
                    lastName: args.userInput.lastName,
                    email: args.userInput.email,
                    password: args.userInput.password
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
            }
        },
        graphiql: true
    })
);

mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false')
.then(() => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})