const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');
const app = express();

const getCanvasAssignments = require('./canvas/utils');

app.use(bodyParser.json());

const googleCalendar = require('./google/utils.js');

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
		googleCalendar.auth('gmontilla18@apu.edu').then(client => {
			let calendar = googleCalendar.calendar(client);
			
			var event = {
				'summary': 'Google I/O 2015',
				'location': '800 Howard St., San Francisco, CA 94103',
				'description': 'A chance to hear more about Google\'s developer products.',
				'start': {
					'dateTime': '2020-02-19T09:00:00-07:00',
					'timeZone': 'America/Los_Angeles',
				},
				'end': {
					'dateTime': '2020-02-19T17:00:00-07:00',
					'timeZone': 'America/Los_Angeles',
				},
				'recurrence': [
					'RRULE:FREQ=DAILY;COUNT=2'
				],
				'attendees': [
					{ 'email': 'lpage@example.com' },
					{ 'email': 'sbrin@example.com' },
				],
				'reminders': {
					'useDefault': false,
					'overrides': [
						{ 'method': 'email', 'minutes': 24 * 60 },
						{ 'method': 'popup', 'minutes': 10 },
					],
				},
			};
			calendar.events.insert({
				calendarId: 'primary',
				resource: event
			}, function(err, event) {
				if (err) throw err;
				// if event
				// 	store event in user scheduledEvents
			});

			// googleCalendar.getEvents(calendar).then(data => {
			// 	res.send(data);
			// }).catch(err => {
			// 	throw err;
			// })
		})
	}
)

app.get(
    '/canvas',
    (req, res) => {
        const token = '2948~F5QurelFrTW4C9AyKJmihX5AyUp7Wrb0T5a51tXdZtdmr5i6Zva4EmLKEbnaa2aO';

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

mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(3000);
	})
	.catch(err => {
		throw err;
	});
