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
    createdEvents: [Event!]
    classPreferences: [ClassPreference!]
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

type Event {
    _id: ID!
    title: String!
    startTime: String!
    endTime: String!
    isQuiz: Boolean!
    users: [ID!]!
}

input EventInput {
    title: String!
    startTime: String!
    endTime: String!
    isQuiz: Boolean!
    users: [ID!]!
}

type ClassPreference {
    _id: ID!
    user: ID!
    classID: Int!
    className: String!
    defaultStudyLength: Int!
    defaultBreakLength: Int!
    defaultTechnique: String!
}

input ClassPreferenceInput {
    user: ID!
    classID: Int!
    className: String!
    defaultStudyLength: Int!
    defaultBreakLength: Int!
    defaultTechnique: String!
}

type RootQuery {
    login(email: String!, password: String!): User
}

type RootMutation {
    createUser(userInput: UserInput): User
    setCanvasToken(userID: ID!, canvasToken: String): User
    setStudyPreference(userID: ID!, defaultStudyLength: Int!, defaultBreakLength: Int!, defaultTechnique: String!): User
    createEvent(eventInput: EventInput): Event!
    deleteEvent(userID: ID!, eventID: ID!): Event!
    createClassPreferences(classPreferenceInput: ClassPreferenceInput!): ClassPreference!
    deleteClassPreferences(userID: ID!, classPreferencesID: ID!): ClassPreference!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
