const { buildSchema } = require('graphql');

module.exports = buildSchema(`
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
    login(email: String!, password: String!): User
}

type RootMutation {
    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);