const GRAPHQL = 'http://localhost:3000/api?';

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
			callback(data)
		})
		.catch(err => {
			return err;
		});
}

module.exports.callGraphql = callGraphql;