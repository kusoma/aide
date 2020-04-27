const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');
const { createEvent, eventExists } = require('./graphql/resolvers/event');
const { classPreferencesExists } = require('./graphql/resolvers/classPreference');
const { getUserEmail } = require('./graphql/resolvers/user');

<<<<<<< Updated upstream
const Canvas = require('./canvas/utils');
const googleCalendar = require('./google/utils');
const APS = require('./aps/utils');
=======
const getCanvasAssignments = require("./canvas/utils");
const sentEmail = require("./resetPassword/utils");
const resetPassword = require("./resetPassword/utils");
const { createEvent } = require("./graphql/resolvers/event")
>>>>>>> Stashed changes

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
		for (const assignment of assignments) {
			eventExists(req.userId, assignment.title).then(event => {
				console.log('Check if assignment already scheduled');
				if (event === null) {
					console.log('Not scheduled\nChecking for class preferences');
					classPreferencesExists(req.userId, assignment.course).then(classPreferences => {
						if (classPreferences === null) {
							console.log('Class preferences not found');
							googleCalendar.auth(email).then(client => {
								let calendar = googleCalendar.calendar(client);
								googleCalendar
									.getEvents(calendar)
									.then(data => {
										console.log('Creating schedule');
										let schedule = APS.createSchedule();
										APS.fillSchedule(schedule, data);
										console.log('Scheduling event')[(googleEvent, aideEvent)] = APS.scheduleEvent(schedule, assignments);

										// calendar.events.insert({
										// 		calendarId: "primary",
										// 		resource: event
										// 	},
										// 	function (err, event) {
										// 		if (err) console.log(err);
										// 		// if event
										// 		// 	store event in user scheduledEvents
										// 	}
										// );
										eventInput['users'] = [ req.userId ]; // TODO: Need to grab the user id from profile/class preferences

										console.log('Adding event to db');
										createEvent({ eventInput }).catch(err => {
											throw err;
										});
									})
									.catch(err => {
										throw err;
									});
							});
						} else {
							// Peer Collaboration
							console.log('Class preferences found\nFilling schedule');
							const peers = classPreferences.peers;
							console.log('Peers - ' + peers);
							APS.peerCollaboration(peers).then(schedule => {
								console.log('Filled schedule', schedule[2]);
								[ googleEvent, aideEvent ] = APS.scheduleEvent(schedule, assignment);
								APS.saveEvent(peers, googleEvent, aideEvent);
							});
						}
					});
				}
			});
		}
	});
});

app.get('/canvas', (req, res) => {
	
	const token = '2948~F5QurelFrTW4C9AyKJmihX5AyUp7Wrb0T5a51tXdZtdmr5i6Zva4EmLKEbnaa2aO';
	console.log(req.query.function);
	
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

<<<<<<< Updated upstream
=======
app.post("/forgetpassword", (req, res) => {
	resetPassword(req, res);
})

app.get("/sentemail", () => {
  sentEmail();
})

>>>>>>> Stashed changes
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
