const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
    canvasToken: String
    studyPreference: StudyPreference!
    classSetting: [ClassSetting!]
}

input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    canvasToken: String
    studyPreference: StudyPreferenceInput
    classSetting: [ClassSettingInput]
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

type ClassSetting {
    _id: ID!
    classNumber: String!
    classTitle: String!
    testAutomate: Boolean!
    testStudyLength: Int!
    testBreakLength: Int!
    homeworkAutomate: Boolean!
    homeworkStudyLength: Int!
    homeworkBreakLength: Int!
    quizAutomate: Boolean!
    quizStudyLength: Int!
    quizBreakLength: Int!
    days: [Int]!
    friends: [String]!
}

input ClassSettingInput {
    classNumber: String!
    classTitle: String!
    testAutomate: Boolean!
    testStudyLength: Int!
    testBreakLength: Int!
    homeworkAutomate: Boolean!
    homeworkStudyLength: Int!
    homeworkBreakLength: Int!
    quizAutomate: Boolean!
    quizStudyLength: Int!
    quizBreakLength: Int!
    days: [Int]!
    friends: [String]!
}

type RootQuery {
    login(email: String!, password: String!): User
}

type RootMutation {
    createUser(userInput: UserInput): User
    setCanvasToken(userID: ID!, canvasToken: String): User
    setStudyPreference(userID: ID!, studyPreferenceInput: StudyPreferenceInput): StudyPreference
    addClassSetting(classSettingInput: ClassSettingInput): [ClassSetting!]
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
