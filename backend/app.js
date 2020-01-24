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

app.use(
    '/canvas',
    (err, res, next) => {
        var request = require('request');

        var headers = {
            'Authorization': 'Bearer 2948~F5QurelFrTW4C9AyKJmihX5AyUp7Wrb0T5a51tXdZtdmr5i6Zva4EmLKEbnaa2aO'
        };

        var options = {
            url: 'https://canvas.apu.edu/api/v1/users/self/upcoming_events',
            headers: headers
        };

        request(options, (err, response, body) => {
            if (err) throw err;
            if (response.statusCode == 200) {
                res.send(body);
            }
        });
    }
)

// TODO: connect to mongodb server instead of local
mongoose.connect(`mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`)
.then(() => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})