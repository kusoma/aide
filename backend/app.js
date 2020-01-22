const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const api = require('./api');

const app = express();

app.use(bodyParser.json());

app.use(
    '/api',
    graphqlHttp({
        schema: buildSchema(api.schema),
        rootValue: {
            createUser: (args) => { return api.createUser(args); }
        },
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