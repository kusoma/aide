const { google } = require('googleapis');
const privatekey = require('/apu-calendar-cca4c98d0afb.json'); // This was downloaded when you created your Service Account Key
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

export default class googleCalendar {
	constructor(user) {
		this.calendar = auth(user).then(calendar(client));		
	}

	calendar = (client) => {
		const calendar = google.calendar({
			version: 'v3',
			auth: client
		});
		return calendar;
	}

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

	getEvents = () => {
		this.calendar.events.list({
			calendarId: 'primary',
			timeMin: (new Date()).toISOString(),
			singleEvents: true,
			orderBy: 'startTime',
		}, (err, res) => {
			if (err) {
				throw err;
			};
			return res.data.items;
		});
	}

	createEvent = (args) => {

	}
}