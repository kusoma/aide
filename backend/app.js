const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const { createEvent, eventExists } = require("./graphql/resolvers/event");
const { classPreferencesExists } = require("./graphql/resolvers/classPreference");
const { getUserEmail } = require("./graphql/resolvers/user")

const getCanvasAssignments = require("./canvas/utils");
const googleCalendar = require("./google/utils");
const APS = require("./aps/utils")

const sentEmail = require("./resetPassword/utils");

const app = express();
app.use(bodyParser.json());

app.use(
	"/api",
	graphqlHttp({
		schema: schema,
		rootValue: graphqlResolvers,
		graphiql: true
	})
);

app.use("/aps", (req, res) => {
	const token = "2948~F5QurelFrTW4C9AyKJmihX5AyUp7Wrb0T5a51tXdZtdmr5i6Zva4EmLKEbnaa2aO"; // Greg
	// const token = "2948~LagNvqsbqAGzlHBjIMoNaCUqQSHLRRsNkvIl8rohSOvQXNFRhumwwK4oyXS4xd5U"; // Blake
	const email = "gmontilla18@apu.edu"

	// TODO: Change to req.token
	getCanvasAssignments(token).then(assignments => {
		let req = {userId: "5e9ae3d3f5c45d09c2c617b4"}

		for (const assignment of assignments) {
			eventExists(req.userId, assignment.title).then(event => {
				console.log("Check if assignment already scheduled")
				if (event === null) {
					console.log("Not scheduled\nChecking for class preferences")
					classPreferencesExists(req.userId, assignment.course).then(classPreferences => {
						if (classPreferences === null) {
							console.log("Class preferences not found")
							googleCalendar.auth(email).then(client => {
								let calendar = googleCalendar.calendar(client);
								googleCalendar.getEvents(calendar).then(data => {
									console.log("Creating schedule")
									let schedule = APS.createSchedule();
									APS.fillSchedule(schedule, data);
									console.log("Scheduling event")
									let scheduledEvent = APS.scheduleEvent(schedule, assignments);
									googleEvent = scheduledEvent[0]
									eventInput = scheduledEvent[1]

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
									eventInput['users'] = [req.userId] // TODO: Need to grab the user id from profile/class preferences

									console.log("Adding event to db")
									// createEvent({eventInput}).catch(err => {
									// 	throw err;
									// })

									// res.send(schedule);
								}).catch(err => {
									throw err;
								})
							});
						} else {
							console.log("Class preferences found\nFilling schedule")
							let schedule = APS.createSchedule();
							const peers = classPreferences.peers;
							console.log(peers);
							APS.peerCollaboration(schedule, peers).then(schedule => {
								console.log("Filled schedule", schedule);
							})
						}
					});
				}});

			}
		});
});

app.get("/canvas", (req, res) => {
	const token =
		"2948~9xKAB9OaqKDraVLBrqO0b3KiIpdq3aKW3cdp3IaoC2U6kcRo9bIjeiLeRSNEfnz0";

	getCanvasAssignments(token).then(data => {
		res.send(data);
	});
});

app.use("/forgetpassword", () => {
	sentEmail();
})

mongoose
	.connect(
		`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		}
	)
	.then(() => {
		app.listen(3000);
		console.log("Connected to DB Successfully");
	})
	.catch(err => {
		throw err;
	});
