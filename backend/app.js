const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');
const { createEvent, eventExists } = require('./graphql/resolvers/event');
const { classPreferencesExists } = require('./graphql/resolvers/classPreference');
const { getUserEmail } = require('./graphql/resolvers/user');

const Canvas = require('./canvas/utils');
const googleCalendar = require('./google/utils');
const APS = require('./aps/utils');

const sentEmail = require('./resetPassword/utils');

const app = express();
app.use(bodyParser.json());

app.use(
	'/api',
	graphqlHttp({
		schema: schema,
		rootValue: graphqlResolvers,
		graphiql: true,
	}),
);

app.use('/forgetpassword', () => {
	sentEmail();
});

app.use(
	'/api',
	graphqlHttp({
		schema: schema,
		rootValue: graphqlResolvers,
		graphiql: true,
	}),
);

app.use('/aps', (req, res) => {
	const token = '2948~F5QurelFrTW4C9AyKJmihX5AyUp7Wrb0T5a51tXdZtdmr5i6Zva4EmLKEbnaa2aO'; // Greg
	// const token = "2948~LagNvqsbqAGzlHBjIMoNaCUqQSHLRRsNkvIl8rohSOvQXNFRhumwwK4oyXS4xd5U"; // Blake
	const email = 'gmontilla18@apu.edu';

	// TODO: Change to req.token
	Canvas.getCanvasAssignments(token).then(assignments => {
		let req = { userId: '5e9ae3d3f5c45d09c2c617b4' };
		const sleep = (milliseconds) => {
			return new Promise(resolve => setTimeout(resolve, milliseconds))
		}
		assignments.forEach(async (assignment, i) => {
			setTimeout(() => {
				APS.APS(assignment, req.userId);
			}, i*2500)
		})
	});
});

app.get('/canvas', (req, res) => {
	const token = '2948~F5QurelFrTW4C9AyKJmihX5AyUp7Wrb0T5a51tXdZtdmr5i6Zva4EmLKEbnaa2aO';

	switch (req.query.function) {
		case 'assignments':
			//res.send('ok + ' + JSON.stringify(req.query.function));
			Canvas.getCanvasAssignments(token).then(data => {
				res.send(data);
			});
			break;
		case 'courses':
			//res.send('ok + ' + JSON.stringify(req.query.function));
			Canvas.getCanvasCourses(token).then(data => {
				res.send(data);
			});
			break;
	}
});

mongoose
	.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		app.listen(3000);
		console.log('Connected to DB Successfully');
	})
	.catch(err => {
		throw err;
	});
