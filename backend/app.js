const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');
const app = express();

const getCanvasAssignments = require('./canvas/utils');

app.use(bodyParser.json());

app.use(
    '/api',
    graphqlHttp({
        schema: schema,
        rootValue: graphqlResolvers,
        graphiql: true
    })
);

app.use(
    '/google',
    (err, res, next) => {
    }
)

app.get(
    '/canvas',
    (req, res) => {
        const token = '2948~R9eqNMW0iz93twhYKO8jPw7BwStGbB5Vb9yGhy3cmPkjloIzAwuGdTOi3R8gtvBL';
        getCanvasAssignments(token).then(data => {
            res.send(data);
        });
    }
)


mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})
