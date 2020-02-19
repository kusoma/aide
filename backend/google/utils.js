const { google } = require('googleapis');
const privatekey = require('/Users/greg/Documents/Projects/aide/backend/google/apu-calendar-cca4c98d0afb.json'); // This was downloaded when you created your Service Account Key
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

module.exports = { 
	calendar: client => {
		return google.calendar({
			version: 'v3',
			auth: client
		});
	},
	auth: async user => {
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
	},
 	getEvents: async calendar => {
		try {
			let events = await calendar.events.list({
				calendarId: 'primary',
				timeMin: (new Date()).toISOString(),
				singleEvents: true,
				orderBy: 'startTime',
			});
			return events.data.items;
		} catch (err) {
			throw err;
		}
		
	},
	createEvent: async ({calendar, event}) => {
		try {
			let res = await calendar.events.insert({
				calendarId: 'primary',
				resource: event
			}, function(err, success) {
				if (err) throw err;
				return success.htmlink;
			});
			return res;
		} catch (err) {
			throw err;
		}
	}
}