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
    start: String!
    end: String!
    isQuiz: Boolean!
    users: [ID!]!
}

input EventInput {
    title: String!
    start: String!
    end: String!
    isQuiz: Boolean!
    users: [ID!]!
}

type ClassPreference {
    _id: ID!
    user: ID!
    peers: [ID!]
    classId: Int!
    className: String!
    defaultStudyLength: Int!
    defaultBreakLength: Int!
    defaultTechnique: String!
}

input ClassPreferenceInput {
    user: ID!
    peers: [ID!]!
    classId: Int!
    className: String!
    defaultStudyLength: Int!
    defaultBreakLength: Int!
    defaultTechnique: String!
}

type RootQuery {
    login(email: String!, password: String!): User
    eventExists(userId: ID!, title: String!): Event
    classPreferencesExists(userId: ID!, classId: Int): ClassPreference
    getUser(userId: ID!): User
}

type RootMutation {
    createUser(userInput: UserInput): User
    setCanvasToken(userId: ID!, canvasToken: String): User
    setStudyPreference(userId: ID!, defaultStudyLength: Int!, defaultBreakLength: Int!, defaultTechnique: String!): User
    createEvent(eventInput: EventInput): Event!
    deleteEvent(userId: ID!, eventId: ID!): Event!
    createClassPreferences(classPreferenceInput: ClassPreferenceInput!): ClassPreference!
    deleteClassPreferences(userId: ID!, classPreferencesId: ID!): ClassPreference!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
