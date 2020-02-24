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
    googleToken: String
<<<<<<< HEAD
    defaultStudyLength: Int
    defaultBreakLength: Int
    defaultTechnique: String
=======
    studyPreference: StudyPreferenceInput!
}

type StudyPreference {
    _id: ID!
    studyLength: Int!
    breakLength: Int!
    timeBetweenBreaks: Int!
    technique: String!
}

input StudyPreferenceInput {
    studyLength: Int!
    breakLength: Int!
    timeBetweenBreaks: Int!
    technique: String!
>>>>>>> origin/feature/020-study-session-frontend
}

type Session {
    _id: ID!
    startTime: Date!
    endTime: Date!
    technique: String!
    owner: User!
}

input SessionInput {
    startTime: Date!
    endTime: Date!
    technique: String!
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
    setStudyPreference(userID: ID!, defaultStudyLength: Int, defaultBreakLength: Int, defaultTechnique: String): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
