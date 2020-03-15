const GRAPHQL = 'http://localhost:3000/api?';
const CANVAS = 'http://localhost:3000/canvas?';
const GOOGLE = 'http://localhost:3000/google?';

async function callGraphql (request, callback) {
	fetch(GRAPHQL, {
		method: 'POST',
		body: JSON.stringify(request),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(res => {
			if (res.status !== 200 && res.status !== 201) {
				throw new Error('Failed!');
			}
			return res.json();
		})
		.then(data => {
			return callback(data)
		})
		.catch(err => {
			return err;
		});
}

async function callCanvas (callback) {
	fetch(CANVAS, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	})
		.then(res => {
			if(res.status !== 200 && res.status !== 201 )
				throw new Error('Error');
			return res.json();
		})
		.then(data => {
			callback(data);
		})
		.catch(err => {
			return err;
		})
}

async function callGoogle (request, callback) {
	await fetch(GOOGLE, {
		method: 'GET',
		body: JSON.stringify(request),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(res => {
			if(res.status !== 200 || res.status !== 201 )
				throw new Error('Error');
			return res.json();
		})
		.catch(err => {
			return err;
		})
}

module.exports.callCanvas = callCanvas;
module.exports.callGoogle = callGoogle;
module.exports.callGraphql = callGraphql;
