const authResolver = require('./auth');
const userResolver = require('./user');
const eventResolver = require('./event');

const rootResolver = {
    ...authResolver,
    ...userResolver,
    ...eventResolver
};

module.exports = rootResolver;