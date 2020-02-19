const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');
const app = express();

<<<<<<< HEAD
const getCanvasAssignments = require('./canvas/utils');
=======
const { google } = require('googleapis');
const privatekey = require('./google/apu-calendar-cca4c98d0afb.json'); // This was downloaded when you created your Service Account Key
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
>>>>>>> feature/015-google-backend

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
		auth('gmontilla18@apu.edu').then(auth => {
			const calendar = google.calendar({version: 'v3', auth});
			calendar.events.list({
				calendarId: 'primary',
				timeMin: (new Date()).toISOString(),
				maxResults: 10,
				singleEvents: true,
				orderBy: 'startTime',
			  }, (err, res) => {
				if (err) return console.log('The API returned an error: ' + err);
				const events = res.data.items;
				if (events.length) {
				  console.log('Upcoming 10 events:');
				  events.map((event, i) => {
					const start = event.start.dateTime || event.start.date;
					console.log(`${start} - ${event.summary}`);
				  });
				} else {
				  console.log('No upcoming events found.');
				}
			  });
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
<<<<<<< HEAD
=======

auth = async (user) => {
	try {
		const jwtClient = new google.auth.JWT(
			privatekey.client_email,
			null,
			privatekey.private_key,
			SCOPES,
			user // User who will be impersonated with this JWT client
		);
		await jwtClient.authorize();
		return jwtClient;

	} catch (err) {
		return err;
	}
}
>>>>>>> feature/015-google-backend
