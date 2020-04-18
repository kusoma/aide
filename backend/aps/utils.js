const { getUserEmail } = require("../graphql/resolvers/user")

const googleCalendar = require("../google/utils");

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
			let endTimeHours = endDateISO.getHours() + (endDateISO.getHours() - 16)

			if (startDateISO.getMinutes() > 30) startTimeHours += 1;

			if (endDateISO.getMinutes() > 30 && endDateISO.getMinutes <= 59) endTimeHours += 1;

			for (let index = startTimeHours; index <= endTimeHours; index++) {
				schedule[day][index] = 1;
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

					return [googleEvent, event]
				}
			}
		}
	},
	peerCollaboration: async (schedule, peers) => {
		for (const peer of peers) {
			await getUserEmail(peer).then(user => {
				console.log("Doing " + user.email)
				googleCalendar.auth(user.email).then(client => {
					let calendar = googleCalendar.calendar(client);
					googleCalendar.getEvents(calendar).then(data => {
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
	}
}