const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
    canvasToken: String
    googleToken: String
    studyPreference: StudyPreference!
}

input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    canvasToken: String
    googleToken: String
    studyPreference: StudyPreferenceInput!
}

type StudyPreference {
    _id: ID!
    studyLength: Int!
    breakLength: Int!
    technique: String!
}

input StudyPreferenceInput {
    studyLength: Int!
    breakLength: Int!
    technique: String!
}

type Session {
    _id: ID!
    startTime: Date!
    endTime: Date!
    owner: User!
}

input SessionInput {
    startTime: Date!
    endTime: Date!
    owner: User!
}

type RootQuery {
    login(email: String!, password: String!): User
    session(time: Date!, owner: User!): Session
}

type RootMutation {
    createUser(userInput: UserInput): User
    createSession(sessionInput: SessionInput): Session
    setGoogleToken(userID: ID!, googleToken: String): User
    setCanvasToken(userID: ID!, canvasToken: String): User
    setStudyPreference(userID: ID!, studyPreferenceInput: StudyPreferenceInput): StudyPreference
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
