const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
    canvasToken: String
}

input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    canvasToken: String
}

type RootQuery {
    login(email: String!, password: String!): User
    session(time: Date!, owner: User!): Session
}

type RootMutation {
    createUser(userInput: UserInput): User
    createSession(sessionInput: SessionInput): Session
    setStudyPreference(userID: ID!, defaultStudyLength: Int, defaultBreakLength: Int, defaultTechnique: String): User
    addCanvasToken(userID: ID!, canvasToken:String): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
