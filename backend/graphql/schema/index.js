const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    canvasToken: String
    defaultStudyLength: Int
    defaultBreakLength: Int
    defaultTechnique: String
}

input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    canvasToken: String
    defaultStudyLength: Int
    defaultBreakLength: Int
    defaultTechnique: String
}

type RootQuery {
    login(email: String!, password: String!): User
    
}

type RootMutation {
    createUser(userInput: UserInput): User
    setCanvasToken(userID: ID!, canvasToken: String): User
    setStudyPreference(userID: ID!, defaultStudyLength: Int, defaultBreakLength: Int, defaultTechnique: String): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
