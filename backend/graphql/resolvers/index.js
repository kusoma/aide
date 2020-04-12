const authResolver = require('./auth');
const userResolver = require('./user');
const eventResolver = require('./event');
const classPreferenceResolver = require('./classPreference')

const rootResolver = {
    ...authResolver,
    ...userResolver,
    ...eventResolver,
    ...classPreferenceResolver
};

module.exports = rootResolver;