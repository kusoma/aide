const { google } = require('googleapis');
const privatekey = require('/apu-calendar-cca4c98d0afb.json'); // This was downloaded when you created your Service Account Key
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

export function calendar(client) {
	return google.calendar({
		version: 'v3',
		auth: client
	});
}

export async function auth (user) {
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

export async function getEvents(calendar) {
	try {
		return await calendar.events.list({
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
	} catch (err) {
		throw err;
	}
}

createEvent = (args) => {

}