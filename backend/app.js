const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { graphql, buildSchema } = require('graphql');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

app.use('/api', (req, res, next) => {
    res.send('working api');
})

app.listen(3000);