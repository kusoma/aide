const { getUser } = require("../graphql/resolvers/user")
const { createEvent, eventExists } = require('../graphql/resolvers/event');
const { classPreferencesExists } = require('../graphql/resolvers/classPreference');

const googleCalendar = require('../google/utils');


module.exports = {
	createSchedule: () => {
		let [r, c] = [8, 24];
		let schedule = Array(r).fill().map(() => Array(c).fill(0));

		return schedule;
	},
	fillSchedule: (schedule, events) => {
		for (const event of events) {
			const startDateISO = new Date(event.start.dateTime)
			const endDateISO = new Date(event.end.dateTime)
			const day = module.exports.dayDifference(startDateISO)

			if (startDateISO.getHours() > 20) continue;

			let startTimeHours = startDateISO.getHours() + (startDateISO.getHours() - 16)
			if (startDateISO.getMinutes() >= 30) startTimeHours += 1;

			const diff = Math.round(Math.floor((Math.abs(endDateISO - startDateISO)/1000)/60)/30);

			for (let index = startTimeHours; index < startTimeHours + diff; index++) {
				if (schedule[day][index] === 0) {
					schedule[day][index] = 1;
				}
			}
		}
	},

	dayDifference: eventDate => {
		const today = module.exports.timezone()
		eventDate = new Date(eventDate)

		return Math.abs(Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate())) / (1000 * 60 * 60 * 24)));
	},

	timezone: () => {
		const today = new Date();
		const timeZoneOffset = (today.getTimezoneOffset() * 60 * 1000);
		return new Date(today.getTime() - timeZoneOffset);
	},

	scheduleEvent: (schedule, event) => {
		for (const day in schedule) {
			for (const interval in schedule[day]) {
				if (schedule[day][interval] === 0) {
					schedule[day][interval] = 1;

					let date = module.exports.timezone()
					date.setDate(date.getDate() + Number(day));

					let hours = Math.floor(Number(interval) / 2 + 8)
					let minutes = interval % 2 === 1 ? '30' : '00'
					let startDateTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getDate()}T${String(hours).padStart(2, '0')}:${minutes}:00`
					let endMinutes = (parseInt(minutes) + 30) % 60;
					let endHours = (((parseInt(minutes) + 30) / 60) === 1) ? (hours + 1) : hours
					let endDateTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getDate()}T${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}:00`

					let googleEvent = {
						summary: event.title,
						description: event.description,
						start: {
							dateTime: startDateTime,
							timeZone: "America/Los_Angeles"
						},
						end: {
							dateTime: endDateTime,
							timeZone: "America/Los_Angeles"
						}
					};

					event.start = startDateTime
                    event.end = endDateTime
					console.log(event.start, event.end)
					return [googleEvent, event]
				}
			}
		}
	},

	peerCollaboration: async (ids) => {
		let schedule = module.exports.createSchedule();
		for (const id of ids) {
			await getUser(id).then(async user => {
				console.log("Doing " + user.email)
				await googleCalendar.auth(user.email).then(async client => {
					let calendar = await googleCalendar.calendar(client);
					await googleCalendar.getEvents(calendar).then(data => {
						module.exports.fillSchedule(schedule, data);
					}).catch(err => {
						throw err;
					})
				});
			}).catch(err => {
				throw err;
			});
		}
		return schedule;
	},

	saveEvent: async (ids, googleEvent, aideEvent) => {
		// Save to Aide database
		let eventInput = aideEvent
		eventInput['users'] = ids
		// createEvent({eventInput}).catch(err => {
		// 	throw err;
		// })
		for (const id of ids) {
			// Get their ids & emails
			await getUser(id).then(async user => {
				// Save to Google Calendar
				await googleCalendar.auth(user.email).then(async client => {
					let calendar = googleCalendar.calendar(client);
						await calendar.events.insert({
								calendarId: "primary",
								resource: googleEvent
							},
							function (err, event) {
								if (err) console.log(err);
								// if event
								// 	store event in user scheduledEvents
							}
						);
				});
			})
		}
	},

	APS: async (assignment, userId) => {
		const email = 'gmontilla18@apu.edu';
		await eventExists(userId, assignment.title).then(async event => {
			console.log('Check if assignment already scheduled');
			if (event === null) {
				console.log('Not scheduled\nChecking for class preferences');
				await classPreferencesExists(userId, assignment.course).then(async classPreferences => {
					if (classPreferences === null) {
						console.log('Class preferences not found');
						googleCalendar.auth(email).then(async client => {
							let calendar = await googleCalendar.calendar(client);
							googleCalendar
								.getEvents(calendar)
								.then(async data => {
									console.log('Creating schedule');
									let schedule = module.exports.createSchedule();
									module.exports.fillSchedule(schedule, data);
									console.log('Scheduling event');
									[googleEvent, aideEvent] = module.exports.scheduleEvent(schedule, assignment);

									await calendar.events.insert({
											calendarId: "primary",
											resource: event
										},
										function (err, event) {
											if (err) console.log(err);
											// if event
											// 	store event in user scheduledEvents
										}
									);
									event['users'] = [ userId ]; // TODO: Need to grab the user id from profile/class preferences

									console.log('Adding event to db');
									// createEvent({ event }).catch(err => {
									// 	throw err;
									// });
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
						module.exports.peerCollaboration(peers).then(async schedule => {
							[ googleEvent, aideEvent ] = module.exports.scheduleEvent(schedule, assignment);
							await module.exports.saveEvent(peers, googleEvent, aideEvent);
						});
					}
				});
			}
		});
	}
}