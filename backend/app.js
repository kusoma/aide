const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./graphql/schema/index');
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

mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})