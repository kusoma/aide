const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const app = express();

const getCanvasAssignments = require("./canvas/utils");
const sentEmail = require("./resetPassword/utils");
const { createEvent } = require("./graphql/resolvers/event")

app.use(bodyParser.json());

const googleCalendar = require("./google/utils");
const APS = require("./aps/utils")

app.use(
	"/api",
	graphqlHttp({
		schema: schema,
		rootValue: graphqlResolvers,
		graphiql: true
	})
);

app.use("/aps", (err, res, next) => {
	const token = "2948~F5QurelFrTW4C9AyKJmihX5AyUp7Wrb0T5a51tXdZtdmr5i6Zva4EmLKEbnaa2aO"; // Greg
	// const token = "2948~LagNvqsbqAGzlHBjIMoNaCUqQSHLRRsNkvIl8rohSOvQXNFRhumwwK4oyXS4xd5U"; // Blake
	const email = "gmontilla18@apu.edu"

	let schedule = APS.createSchedule();

	getCanvasAssignments(token).then(assignments => {
			googleCalendar.auth(email).then(client => {
				let calendar = googleCalendar.calendar(client);
				googleCalendar.getEvents(calendar).then(data => {

					APS.fillSchedule(schedule, data);
					let scheduledEvents = APS.scheduleEvents(schedule, assignments);
					for (let event of scheduledEvents) {
						googleEvent = event[0]
						eventInput = event[1]

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
						eventInput['users'] = ["5e9393146b4c621e9b49e092", "5e953f88c3b86437271193ee"] // TODO: Need to grab the user id from profile/class preferences

						createEvent({eventInput}).catch(err => {
							throw err;
						})
					}

					res.send(schedule);
				}).catch(err => {
					throw err;
				})
			});
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
		{useNewUrlParser: true, useUnifiedTopology: true}
	)
	.then(() => {
		app.listen(3000);
		console.log("Connected to DB Successfully");
	})
	.catch(err => {
		throw err;
	});
