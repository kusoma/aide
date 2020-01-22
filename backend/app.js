const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const schema = require('./graphql/schema/index');
// const { schema } = require('./api');
const graphqlResolvers = require('./graphql/resolvers/index');
const app = express();

app.use(bodyParser.json());

app.use(
    '/api',
    graphqlHttp({
        schema: schema,
        rootValue: graphqlResolvers,
        graphiql: true
    })
);

// TODO: connect to mongodb server instead of local
mongoose.connect(`mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`)
.then(() => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})